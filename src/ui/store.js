import { writable } from 'svelte/store'

/**
 * contains the path of the current project
 */
export const projectStore = writable(undefined)

export const fileViewerStore = writable({
    filePath: undefined,
    fileName: undefined
})
