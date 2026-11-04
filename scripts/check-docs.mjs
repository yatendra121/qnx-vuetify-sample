// Checks what `vitepress build` doesn't: that the Vue examples in the docs compile
// and only use real exports, and that internal links and their anchors exist.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { compileScript, compileTemplate, parse } from "vue/compiler-sfc";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const docsRoot = join(root, "docs");
const errors = [];

// Matches the slugs VitePress gives headings.
const slugify = (text) =>
  text
    .normalize("NFKD")
    .replace(/[\u0300-\u036F\u0000-\u001f]/g, "")
    .replace(/[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'“”‘’<>,.?/]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/^(\d)/, "_$1")
    .toLowerCase();

const walk = (dir) =>
  readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    if (entry === ".vitepress") return [];
    return statSync(path).isDirectory() ? walk(path) : path.endsWith(".md") ? [path] : [];
  });

const namedExports = (file) => {
  const source = readFileSync(join(root, "node_modules", file), "utf-8");
  const names = [...source.matchAll(/export (?:type )?\{([^}]*)\}/g)].flatMap(([, list]) =>
    list.split(",").map((item) => item.trim().split(/\s+as\s+/).pop()),
  );
  return new Set(names.filter((name) => name && name !== "default"));
};

const exportsByModule = {
  "@qnx/vuetify": namedExports("@qnx/vuetify/dist/index.d.ts"),
  "@qnx/vuetify/integrations": namedExports("@qnx/vuetify/dist/integrations.d.ts"),
};
const components = new Set(
  [...exportsByModule["@qnx/vuetify"], ...exportsByModule["@qnx/vuetify/integrations"]].filter((name) =>
    name.startsWith("Vq"),
  ),
);
const pascal = (tag) => tag.replace(/(^|-)(\w)/g, (_, __, char) => char.toUpperCase());

const checkExample = (code, lang, where) => {
  const report = (message) => errors.push(`${where}: ${message}`);

  for (const [, names, module] of code.matchAll(/import\s*\{([^}]*)\}\s*from\s*["']([^"']+)["']/g)) {
    const known = exportsByModule[module];
    if (!known) continue;
    for (const name of names.split(",").map((item) => item.trim().split(/\s+as\s+/)[0]).filter(Boolean)) {
      if (!known.has(name)) report(`"${name}" is not exported by ${module}`);
    }
  }
  if (lang !== "vue") return;

  const source = /<(script|template)[\s>]/.test(code.split("\n").find((line) => !line.startsWith("<!--")) ?? "")
    ? code
    : `<template>\n${code}\n</template>`;
  const { descriptor, errors: parseErrors } = parse(source);
  parseErrors.forEach((error) => report(`does not parse: ${error.message}`));
  if (parseErrors.length) return;

  try {
    if (descriptor.scriptSetup) compileScript(descriptor, { id: "docs" });
  } catch (error) {
    report(`script does not compile: ${error.message}`);
  }
  if (!descriptor.template) return;

  const { errors: templateErrors } = compileTemplate({
    source: descriptor.template.content,
    filename: "example.vue",
    id: "docs",
  });
  templateErrors.forEach((error) => report(`template does not compile: ${error.message ?? error}`));

  const scope = descriptor.scriptSetup?.content ?? "";
  for (const [, tag] of descriptor.template.content.matchAll(/<((?:Vq|vq-)[\w-]*)/g)) {
    const name = pascal(tag);
    if (!components.has(name)) report(`<${tag}> is not an exported component`);
    else if (descriptor.scriptSetup && !new RegExp(`\\b${name}\\b`).test(scope)) {
      report(`<${tag}> is used but not imported`);
    }
  }
};

const anchorsOf = (markdown) => {
  const body = markdown.replace(/^(`{3,})[\s\S]*?^\1/gm, "");
  return new Set(
    [...body.matchAll(/^#{1,6}\s+(.+)$/gm)].map(([, title]) => slugify(title.replace(/`/g, "").trim())),
  );
};

const resolvePage = (link, from) => {
  const base = link.startsWith("/") ? join(docsRoot, link) : resolve(dirname(from), link);
  const candidates = link.endsWith("/") || link === "" ? [join(base, "index.md")] : [base, `${base}.md`, join(base, "index.md")];
  return candidates.find((path) => existsSync(path) && statSync(path).isFile());
};

for (const file of walk(docsRoot)) {
  const rel = relative(root, file);
  const markdown = readFileSync(file, "utf-8");

  for (const [index, [, lang, code]] of [...markdown.matchAll(/^```(vue|ts|typescript)\n([\s\S]*?)^```/gm)].entries()) {
    checkExample(code, lang, `${rel} example ${index + 1}`);
  }

  for (const [, snippet] of markdown.matchAll(/^<<<\s+(\S+)/gm)) {
    if (!existsSync(resolve(dirname(file), snippet))) errors.push(`${rel}: missing snippet ${snippet}`);
  }

  const prose = markdown.replace(/^(`{3,})[\s\S]*?^\1/gm, "");
  const links = [...prose.matchAll(/\]\(([^)\s]+)\)/g), ...prose.matchAll(/^\s+link:\s*(\S+)$/gm)].map((match) => match[1]);
  for (const link of links) {
    if (/^[a-z]+:/i.test(link)) continue;
    const [path, anchor] = link.split("#");
    const page = path ? resolvePage(path, file) : file;
    if (!page) {
      errors.push(`${rel}: broken link ${link}`);
    } else if (anchor && !anchorsOf(readFileSync(page, "utf-8")).has(anchor)) {
      errors.push(`${rel}: missing anchor ${link}`);
    }
  }
}

const config = readFileSync(join(docsRoot, ".vitepress/config.mts"), "utf-8");
for (const [, link] of config.matchAll(/link:\s*"(\/[^"]*)"/g)) {
  if (!resolvePage(link, docsRoot)) errors.push(`docs/.vitepress/config.mts: broken link ${link}`);
}

// Every public export should be documented somewhere.
const allDocs = walk(docsRoot).map((file) => readFileSync(file, "utf-8")).join("\n");
for (const name of [...exportsByModule["@qnx/vuetify"], ...exportsByModule["@qnx/vuetify/integrations"]]) {
  if (!allDocs.includes(name)) errors.push(`export "${name}" is not documented`);
}

if (errors.length) {
  console.error(errors.map((error) => `✗ ${error}`).join("\n"));
  console.error(`\n${errors.length} problem(s) found.`);
  process.exit(1);
}
console.log("✓ Docs examples, links, and export coverage are valid.");
