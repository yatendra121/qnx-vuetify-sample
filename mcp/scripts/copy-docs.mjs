// Copies the VitePress docs into mcp/docs/ for bundling in the npm package
import { cpSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dir = dirname(fileURLToPath(import.meta.url))
const src = resolve(__dir, '../../docs')
const dest = resolve(__dir, '../docs')

mkdirSync(dest, { recursive: true })
cpSync(src, dest, {
  recursive: true,
  filter: (f) => !f.includes('.vitepress') && !f.includes('node_modules')
})

console.log('docs copied →', dest)
