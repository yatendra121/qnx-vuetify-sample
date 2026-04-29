#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'
import { existsSync } from 'fs'
import { join, resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { loadComponents, loadComposables, readDoc } from './docs.js'

const __dir = dirname(fileURLToPath(import.meta.url))

const DOCS_ROOT =
  process.env.VQ_DOCS_ROOT ??
  (existsSync(resolve(__dir, '../docs/components'))
    ? resolve(__dir, '../docs')    // published: bundled docs next to dist/
    : resolve(__dir, '../../docs') // dev: VitePress docs in the repo
  )

const components = loadComponents(DOCS_ROOT)
const composables = loadComposables(DOCS_ROOT)

const text = (t: string) => ({ content: [{ type: 'text' as const, text: t }] })

// Strips the 'vq'/'vq-' prefix and hyphens so VqTextField, vq-text-field,
// TextField, and textfield all collapse to the same key for matching.
const normalizeComponentName = (n: string) =>
  n.replace(/^vq-?/i, '').replace(/-/g, '').toLowerCase()

const server = new McpServer({ name: 'vq-vuetify', version: '0.1.0' })

server.registerTool('get_component_list', {
  description: 'List all @qnx/vuetify components grouped by category',
}, async () => {
  const grouped: Record<string, string[]> = {}
  for (const c of components) {
    ;(grouped[c.category] ??= []).push(`- **${c.name}**: ${c.description}`)
  }
  const body = Object.entries(grouped)
    .map(([cat, items]) => `### ${cat}\n\n${items.join('\n')}`)
    .join('\n\n')
  return text(`# @qnx/vuetify Components\n\n${body}`)
})

server.registerTool('get_component_docs', {
  description: 'Full documentation for a @qnx/vuetify component: props, events, and examples',
  inputSchema: {
    name: z.string().describe('Component name, e.g. VqForm, VqTextField, VqDataTable')
  }
}, async ({ name }) => {
  const key = normalizeComponentName(name.trim())
  const component = components.find(c => normalizeComponentName(c.name) === key)
  if (!component) {
    return text(`Component "${name}" not found.\n\nAvailable: ${components.map(c => c.name).join(', ')}`)
  }
  return text(readDoc(component.path))
})

server.registerTool('get_composable_list', {
  description: 'List all @qnx/vuetify composables with descriptions',
}, async () => {
  const body = composables.map(c => `- **${c.name}**: ${c.description}`).join('\n')
  return text(`# @qnx/vuetify Composables\n\n${body}`)
})

server.registerTool('get_composable_docs', {
  description: 'Full documentation for a @qnx/vuetify composable',
  inputSchema: {
    name: z.string().describe('Composable name, e.g. useVqForm, useVqDataTable, collectVqHeaders')
  }
}, async ({ name }) => {
  const key = name.trim().toLowerCase()
  const composable =
    composables.find(c => c.name.toLowerCase() === key) ??
    composables.find(c => c.name.toLowerCase().includes(key))
  if (!composable) {
    return text(`Composable "${name}" not found.\n\nAvailable: ${composables.map(c => c.name).join(', ')}`)
  }
  return text(readDoc(composable.path))
})

server.registerTool('get_installation_guide', {
  description: 'Installation steps and peer dependencies for @qnx/vuetify',
}, async () => text(readDoc(join(DOCS_ROOT, 'guide/installation/index.md'))))

server.registerTool('get_usage_guide', {
  description: 'Practical usage examples covering forms, tables, lists, and more',
}, async () => text(readDoc(join(DOCS_ROOT, 'guide/usage/index.md'))))

const transport = new StdioServerTransport()
await server.connect(transport)
