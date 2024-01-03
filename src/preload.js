const { contextBridge, ipcRenderer, shell } = require('electron')
const os = require('os')
const path = require("path")

const logger = require('./lib/logs/handler')

const pfsDelete = require('./lib/filesystem/delete')
const fileTypes = require('./lib/filesystem/filesTypes')
const pfsRead = require('./lib/filesystem/read')
const pfsWrite = require('./lib/filesystem/write')

const homedir = os.homedir()

contextBridge.exposeInMainWorld('darkMode', {
    toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
    get: () => ipcRenderer.invoke('dark-mode:get')
})

contextBridge.exposeInMainWorld('fs', {
    homeDir: homedir,
    fileTypes: fileTypes,
    isDirectory: (path) => {
        return pfsRead.isDirectory(path)
    },
    isFileExists: (path) => {
        return pfsRead.isFileExists(path)
    },
    deleteFile: (filePath) => {
        return pfsDelete.deleteFile(filePath)
    },
    deleteFolder: (folderPath, recursive = false) => {
        return pfsDelete.deleteFolder(folderPath, recursive)
    },
    editFile: (filePath, newFileContent) => {
        pfsWrite.editFile(filePath, newFileContent)
    },
    newFile: (filePath, fileContent) => {
        pfsWrite.newFile(filePath, fileContent)
    },
    newFolder: (path) => {
        pfsWrite.newFolder(path)
    },
    readExistingProjects: (homedir) => {
        return pfsRead.readExistingProjects(homedir)
    },
    readFolderContent: (path, files = []) => {
        return pfsRead.readFolderContent(path, files)
    },
    readFile: async (path) => {
        return pfsRead.readFile(path)
    },
    parseConfigFile: async (configFilePath) => {
        return pfsRead.parseConfigFile(configFilePath)
    }
})

contextBridge.exposeInMainWorld('link', {
    open: async (url) => {
        await shell.openExternal(url)
    }
})

contextBridge.exposeInMainWorld('logger', {
    logInfo: (feature, text) => {
        logger.logInfo(feature, text)
    },
    logDebug: (feature, text) => {
        logger.logDebug(feature, text)
    },
    logWarning: (feature, text) => {
        logger.logWarning(feature, text)
    },
    logError: (feature, text) => {
        logger.logError(feature, text)
    },
    assert: (condition, feature, text) => {
        logger.assert(condition, feature, text)
    }
})

if(!pfsRead.isDirectory(path.join(homedir + "/paxoProjects"))) {
    pfsWrite.newFolder(path.join(homedir + "/paxoProjects"))
}

ipcRenderer.on('app-ready', () => {
    const loader = document.getElementById('loader');
    loader.style.display = 'none';
})

logger.logInfo('preload', 'app started')
