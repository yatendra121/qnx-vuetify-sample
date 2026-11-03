import { AxiosError, CanceledError } from 'axios'
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { _axios } from '@/plugins/axios'

// Every playground request goes to a `playground-mock/...` URL and is answered here,
// so previews work offline and never reach the real API. Other requests pass
// through untouched, and the interceptor only lives while the page is open.
const PREFIX = 'playground-mock'

export type MockMode = 'success' | 'empty' | 'validation' | 'server'

export const mockAction = (
    resource: string,
    mode: unknown = 'success',
    latency: unknown = 400
) => `${PREFIX}/${mode}/${latency}/${resource}`

const PLANS = ['Basic', 'Standard', 'Premium']
const FIRST = ['Asha', 'Ben', 'Chen', 'Dara', 'Emil', 'Farah', 'Gita', 'Hugo']
const LAST = ['Rao', 'Silva', 'Wong', 'Khan', 'Novak', 'Haddad', 'Iyer', 'Lund']

export interface MockMember {
    id: string
    name: string
    email: string
    plan: string
    status: 'active' | 'inactive'
}

export const mockMembers = (): MockMember[] =>
    Array.from({ length: 37 }, (_, index) => {
        const name = `${FIRST[index % 8]} ${LAST[(index * 3) % 8]}`
        return {
            id: `m-${String(index + 1).padStart(2, '0')}`,
            name,
            email: `${name.replace(' ', '.').toLowerCase()}${index + 1}@example.com`,
            plan: PLANS[index % 3],
            status: index % 4 === 3 ? 'inactive' : 'active'
        }
    })

const readBody = (data: unknown): Record<string, unknown> => {
    if (typeof data === 'string') {
        try {
            return JSON.parse(data)
        } catch {
            return Object.fromEntries(new URLSearchParams(data).entries())
        }
    }
    if (data instanceof FormData) return Object.fromEntries(data.entries())
    return (data as Record<string, unknown>) ?? {}
}

const queryMembers = (query: URLSearchParams) => {
    const search = (query.get('search') ?? '').toLowerCase()
    const plan = query.get('plan')
    const rows = mockMembers().filter(
        (row) =>
            (!search || row.name.toLowerCase().includes(search)) &&
            (!plan || row.plan === plan)
    )

    for (const [key, order] of query.entries()) {
        const sortKey = key.match(/^sortBy.*\[(\w+)\]$/)?.[1]
        if (sortKey) {
            const field = sortKey as keyof MockMember
            const direction = order === 'desc' ? -1 : 1
            rows.sort(
                (a, b) => a[field].localeCompare(b[field]) * direction
            )
        }
    }

    const size = Number(query.get('itemsPerPage') ?? query.get('page_size') ?? 10)
    const page = Number(query.get('page') ?? 1)
    return {
        data: size < 0 ? rows : rows.slice((page - 1) * size, page * size),
        total: rows.length
    }
}

const respond = (
    config: InternalAxiosRequestConfig,
    status: number,
    data: unknown
): AxiosResponse => {
    const response = { config, status, statusText: String(status), headers: {}, data }
    if (status < 400) return response
    throw new AxiosError(
        `Request failed with status code ${status}`,
        AxiosError.ERR_BAD_REQUEST,
        config,
        null,
        response
    )
}

const wait = (ms: number, config: InternalAxiosRequestConfig) =>
    new Promise<void>((resolve, reject) => {
        const timer = setTimeout(resolve, ms)
        const cancel = () => {
            clearTimeout(timer)
            reject(new CanceledError('canceled', undefined, config))
        }
        config.signal?.addEventListener?.('abort', cancel)
        config.cancelToken?.promise.then(cancel)
    })

type RequestListener = (summary: string) => void
let onRequest: RequestListener | undefined

const mockAdapter = async (config: InternalAxiosRequestConfig) => {
    const [path, queryString] = (config.url ?? '').split('?')
    const [, mode, latency, ...resource] = path.split('/')
    const method = (config.method ?? 'get').toUpperCase()
    const body = readBody(config.data)
    const summary = `${method} ${resource.join('/')}${queryString ? `?${decodeURIComponent(queryString)}` : ''}`
    onRequest?.(`${summary} (mock: ${mode})`)

    await wait(Number(latency), config)

    if (mode === 'server') {
        return respond(config, 500, { success: false, message: 'Server error' })
    }
    if (mode === 'validation') {
        const keys = Object.keys(body)
        return respond(config, 422, {
            success: false,
            message: 'The given data was invalid.',
            errors: Object.fromEntries(
                (keys.length ? keys : ['form']).map((key) => [
                    key,
                    [`The server rejected ${key}.`]
                ])
            )
        })
    }
    if (method !== 'GET') {
        return respond(config, 200, {
            success: true,
            message: 'Saved',
            data: body
        })
    }
    const data =
        mode === 'empty'
            ? { data: [], total: 0 }
            : queryMembers(new URLSearchParams(queryString))
    return respond(config, 200, { success: true, message: 'OK', data })
}

export const installMockApi = (listener: RequestListener) => {
    onRequest = listener
    const id = _axios.interceptors.request.use((config) => {
        if (config.url?.startsWith(`${PREFIX}/`)) config.adapter = mockAdapter
        return config
    })
    return () => {
        onRequest = undefined
        _axios.interceptors.request.eject(id)
    }
}
