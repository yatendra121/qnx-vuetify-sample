import { readdirSync, readFileSync } from 'fs'
import { join, basename } from 'path'

export interface DocEntry {
  name: string
  description: string
  path: string
  category: string
}

function toPascalCase(file: string): string {
  return basename(file, '.md').split('-').map(w => w[0].toUpperCase() + w.slice(1)).join('')
}

function toCamelCase(file: string): string {
  return basename(file, '.md').split('-').map((w, i) => i === 0 ? w : w[0].toUpperCase() + w.slice(1)).join('')
}

function getDescription(filePath: string): string {
  return readFileSync(filePath, 'utf-8')
    .split('\n')
    .find(l => l.trim() && !l.startsWith('#') && !l.startsWith('>') && !l.startsWith('```'))
    ?.trim() ?? ''
}

export function loadComponents(docsRoot: string): DocEntry[] {
  const entries: DocEntry[] = []
  const componentsDir = join(docsRoot, 'components')

  for (const dir of readdirSync(componentsDir, { withFileTypes: true })) {
    if (!dir.isDirectory()) continue
    for (const file of readdirSync(join(componentsDir, dir.name))) {
      if (!file.endsWith('.md') || !file.startsWith('vq-')) continue
      const filePath = join(componentsDir, dir.name, file)
      entries.push({
        name: toPascalCase(file),
        description: getDescription(filePath),
        path: filePath,
        category: dir.name
      })
    }
  }

  return entries
}

export function loadComposables(docsRoot: string): DocEntry[] {
  const composablesDir = join(docsRoot, 'composables')
  return readdirSync(composablesDir)
    .filter(f => f.endsWith('.md') && f !== 'index.md')
    .map(file => {
      const filePath = join(composablesDir, file)
      return {
        name: toCamelCase(file),
        description: getDescription(filePath),
        path: filePath,
        category: 'composables'
      }
    })
}

export function readDoc(filePath: string): string {
  return readFileSync(filePath, 'utf-8')
}
