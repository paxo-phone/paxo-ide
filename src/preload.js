const { contextBridge } = require('electron')
const { isDirectory, readFolderContent } = require('./lib/filesystem/read')

contextBridge.exposeInMainWorld('fs', {
    isDirectory: (path) => {
        return isDirectory(path)
    },
    readFolderContent: (path, files = []) => {
        return readFolderContent(path, files)
    }
})

console.log('preload')
