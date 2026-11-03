import * as library from '@qnx/vuetify'
import * as integrations from '@qnx/vuetify/integrations'
import type { ShowcaseEntry } from '../types'
import { dataEntries } from './data'
import { fieldEntries } from './fields'
import { formEntries } from './forms'
import { utilityEntries } from './utilities'
import { QNX, QNX_INTEGRATIONS } from './shared'

export const catalog: ShowcaseEntry[] = [
    ...fieldEntries.filter((entry) => entry.category !== 'Integrations'),
    ...formEntries,
    ...dataEntries,
    ...fieldEntries.filter((entry) => entry.category === 'Integrations'),
    ...utilityEntries
]

export const categoryOrder = [
    'Form fields',
    'Forms',
    'Data tables',
    'Lists & filters',
    'Integrations',
    'Setup & localization'
]

const publicExports = [
    ...Object.keys(library).map((name) => `${QNX}:${name}`),
    ...Object.keys(integrations).map((name) => `${QNX_INTEGRATIONS}:${name}`)
]

// Read from the module itself, so a library upgrade that adds an export shows up
// on the page, and fails the unit test, until it has an entry.
export const coverage = () => {
    const covered = new Set(
        catalog.map((entry) => `${entry.importPath}:${entry.exportName}`)
    )
    return {
        total: publicExports.length,
        missing: publicExports.filter((key) => !covered.has(key)),
        stale: [...covered].filter((key) => !publicExports.includes(key))
    }
}

// In the library README, but not exported by the installed version.
export const documentedButNotExported = ['VqDatatableItemAction'].filter(
    (name) => !(name in library)
)
