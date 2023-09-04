const { contextBridge } = require('electron')
const { isDirectory, readFolderContent, readFile } = require('./lib/filesystem/read')

contextBridge.exposeInMainWorld('fs', {
    isDirectory: (path) => {
        return isDirectory(path)
    },
    readFolderContent: (path, files = []) => {
        return readFolderContent(path, files)
    },
    readFile: async (path) => {
        return readFile(path)
    }
})

console.log('preload')
