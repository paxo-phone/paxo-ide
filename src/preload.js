const { contextBridge } = require('electron')
const fileTypes = require('./lib/filesystem/filesTypes')
const { isDirectory, readExistingProjects, readFolderContent, readFile } = require('./lib/filesystem/read')
const { newFile, newFolder } = require('./lib/filesystem/write')
const os = require('os');
const path = require("path");

const homedir = os.homedir()

contextBridge.exposeInMainWorld('fs', {
    homeDir: homedir,
    fileTypes: fileTypes,
    isDirectory: (path) => {
        return isDirectory(path)
    },
    newFile: (filePath, fileContent) => {
        newFile(filePath, fileContent)
    },
    newFolder: (path) => {
        newFolder(path)
    },
    readExistingProjects: (homedir) => {
        return readExistingProjects(homedir)
    },
    readFolderContent: (path, files = []) => {
        return readFolderContent(path, files)
    },
    readFile: async (path) => {
        return readFile(path)
    }
})

if(!isDirectory(path.join(homedir + "/paxoProjects"))) {
    newFolder(path.join(homedir + "/paxoProjects"))
}

console.log('preload')
