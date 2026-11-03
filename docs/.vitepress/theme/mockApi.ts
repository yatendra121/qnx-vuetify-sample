import { AxiosError, CanceledError } from "axios";
import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";

// Answers every request from the live demos in the browser, so they work offline
// and don't depend on a real backend. It follows the shapes in guide/server-contract.
const FIRST = ["Asha", "Ben", "Chen", "Dara", "Emil", "Farah", "Gita", "Hugo"];
const LAST = ["Rao", "Silva", "Wong", "Khan", "Novak", "Haddad", "Iyer", "Lund"];

const users = Array.from({ length: 37 }, (_, index) => {
  const name = `${FIRST[index % 8]} ${LAST[(index * 3) % 8]}`;
  return {
    id: index + 1,
    name,
    email: `${name.replace(" ", ".").toLowerCase()}${index + 1}@example.com`,
    createdAt: `2026-${String((index % 12) + 1).padStart(2, "0")}-15`,
  };
});

type User = (typeof users)[number];

const listUsers = (query: URLSearchParams) => {
  const search = (query.get("search") ?? "").toLowerCase();
  const rows = users.filter((user) => !search || user.name.toLowerCase().includes(search));

  for (const [key, order] of query.entries()) {
    const field = key.match(/^sortBy\[\d+\]\[(\w+)\]$/)?.[1] as keyof User | undefined;
    if (field) {
      rows.sort((a, b) => String(a[field]).localeCompare(String(b[field])) * (order === "desc" ? -1 : 1));
    }
  }

  const size = Number(query.get("itemsPerPage") ?? query.get("page_size") ?? 10);
  const page = Number(query.get("page") ?? 1);
  return { data: size < 0 ? rows : rows.slice((page - 1) * size, page * size), total: rows.length };
};

const readName = (data: unknown) => {
  if (data instanceof FormData) return data.get("name");
  return typeof data === "string" ? JSON.parse(data).name : undefined;
};

const wait = (config: InternalAxiosRequestConfig) =>
  new Promise<void>((resolve, reject) => {
    const timer = setTimeout(resolve, 300);
    const cancel = () => {
      clearTimeout(timer);
      reject(new CanceledError("canceled", undefined, config));
    };
    config.signal?.addEventListener?.("abort", cancel);
    config.cancelToken?.promise.then(cancel);
  });

export const mockAdapter = async (config: InternalAxiosRequestConfig): Promise<AxiosResponse> => {
  await wait(config);

  const respond = (status: number, data: unknown): AxiosResponse => ({
    config,
    status,
    statusText: String(status),
    headers: {},
    data,
  });

  if ((config.method ?? "get").toLowerCase() === "get") {
    const query = new URLSearchParams((config.url ?? "").split("?")[1]);
    return respond(200, { message: "OK", data: listUsers(query) });
  }

  // Lets a demo show server errors landing on a field: submit the name "taken".
  if (readName(config.data) === "taken") {
    const response = respond(422, {
      message: "The given data was invalid.",
      errors: { name: "This name is already taken." },
    });
    throw new AxiosError("Request failed with status code 422", AxiosError.ERR_BAD_REQUEST, config, null, response);
  }

  return respond(200, { message: "Saved", data: {} });
};
