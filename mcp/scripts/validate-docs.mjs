import { readdirSync, readFileSync, existsSync } from 'fs'
import { join, resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dir = dirname(fileURLToPath(import.meta.url))
const DOCS_ROOT = resolve(__dir, '../../docs')

let errors = 0
let warnings = 0

function fail(rel, msg) {
  console.error(`  ✗ [ERROR] ${rel}: ${msg}`)
  errors++
}

function warn(rel, msg) {
  console.warn(`  ⚠ [WARN]  ${rel}: ${msg}`)
  warnings++
}

function getFirstDescription(content) {
  return content.split('\n').find(l => l.trim() && !l.startsWith('#') && !l.startsWith('>') && !l.startsWith('```'))?.trim() ?? ''
}

function getSectionBody(content, heading) {
  const re = new RegExp(`^## ${heading}\\s*$`, 'm')
  const start = content.search(re)
  if (start === -1) return null
  const afterHeading = content.slice(start + heading.length + 4)
  const nextSection = afterHeading.search(/^## /m)
  return nextSection === -1 ? afterHeading : afterHeading.slice(0, nextSection)
}

function validateComponent(filePath) {
  const rel = filePath.replace(DOCS_ROOT + '/', '')
  const content = readFileSync(filePath, 'utf-8')

  if (!content.trim()) { fail(rel, 'file is empty'); return }

  if (!content.split('\n').some(l => l.startsWith('# ')))
    fail(rel, 'missing top-level heading (# Title)')

  if (!getFirstDescription(content))
    warn(rel, 'no description paragraph — used by MCP get_component_list')

  if (!/^## Props/m.test(content)) {
    warn(rel, 'no ## Props section')
  } else {
    const body = getSectionBody(content, 'Props') ?? ''
    const isEmpty = !body.trim() || /\bnone\b/i.test(body)
    if (!isEmpty && !/\|.*\|.*\|/.test(body))
      warn(rel, '## Props section has no markdown table and no "None" note')
  }

  if (!/```(vue|js|ts|html)/m.test(content))
    warn(rel, 'no code example (```vue / ```js / ```ts block)')
}

function validateComposable(filePath) {
  const rel = filePath.replace(DOCS_ROOT + '/', '')
  const content = readFileSync(filePath, 'utf-8')

  if (!content.trim()) { fail(rel, 'file is empty'); return }

  if (!content.split('\n').some(l => l.startsWith('# ')))
    fail(rel, 'missing top-level heading (# Title)')

  if (!getFirstDescription(content))
    warn(rel, 'no description paragraph — used by MCP get_composable_list')

  const hasParamsSection = /^## (Parameters|Options|Arguments|Signature|Returns|Type Parameter)/m.test(content)
  if (!hasParamsSection)
    warn(rel, 'no ## Parameters / ## Returns / ## Signature / ## Type Parameter section')

  if (!/```(vue|js|ts)/m.test(content))
    warn(rel, 'no code example (```vue / ```js / ```ts block)')
}

function validateGuide(filePath) {
  const rel = filePath.replace(DOCS_ROOT + '/', '')
  const content = readFileSync(filePath, 'utf-8')

  if (!content.trim()) { fail(rel, 'file is empty'); return }

  if (!content.split('\n').some(l => l.startsWith('# ')))
    fail(rel, 'missing top-level heading (# Title)')

  if (!/```/m.test(content))
    warn(rel, 'no code block of any kind')
}

// --- Components ---
console.log('\n=== Components ===')
const componentsDir = join(DOCS_ROOT, 'components')
let componentCount = 0
for (const dir of readdirSync(componentsDir, { withFileTypes: true })) {
  if (!dir.isDirectory()) continue
  for (const file of readdirSync(join(componentsDir, dir.name))) {
    if (!file.endsWith('.md') || !file.startsWith('vq-')) continue
    validateComponent(join(componentsDir, dir.name, file))
    componentCount++
  }
}
console.log(`  ${componentCount} component doc(s) checked`)

// --- Composables ---
console.log('\n=== Composables ===')
const composablesDir = join(DOCS_ROOT, 'composables')
let composableCount = 0
for (const file of readdirSync(composablesDir)) {
  if (!file.endsWith('.md') || file === 'index.md') continue
  validateComposable(join(composablesDir, file))
  composableCount++
}
console.log(`  ${composableCount} composable doc(s) checked`)

// --- Required guide files (must exist and be non-empty) ---
console.log('\n=== Guide files ===')
const requiredGuides = [
  'guide/installation/index.md',
  'guide/usage/index.md',
]
for (const rel of requiredGuides) {
  const filePath = join(DOCS_ROOT, rel)
  if (!existsSync(filePath)) {
    fail(rel, 'file missing — required by MCP get_installation_guide / get_usage_guide')
  } else {
    validateGuide(filePath)
  }
}
console.log(`  ${requiredGuides.length} guide file(s) checked`)

// --- Summary ---
console.log('\n' + '─'.repeat(50))
if (errors === 0 && warnings === 0) {
  console.log('✓ All docs valid — no issues found.')
} else {
  if (errors) console.error(`\n${errors} error(s) found`)
  if (warnings) console.warn(`${warnings} warning(s) found`)
}
console.log()
process.exit(errors > 0 ? 1 : 0)
