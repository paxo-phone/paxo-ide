const fs = require('fs')
const fsp = require('fs').promises
const { join } = require('path')

const tomlParser = require('toml')

const logger = require('../logs/handler')

/**
 * Read the filenames of a folder, recursively.
 * @param {string} dir 
 * @param {string[]} files not required, used for recursivity
 * @returns {string[]} files
 */
function readFolderContent(dir, files = []) {
    const fileList = fs.readdirSync(dir)
  
    for (const file of fileList) {
        const name = `${dir}/${file}`
        
        if (fs.statSync(name).isDirectory()) {
            readFolderContent(name, files)
        } else {
            files.push(name)
        }
    }
    
    logger.logInfo('fs:read', 'folder successfully read')
    return files
}

/**
 * Read all existing Paxo projects, located in <user>/paxoProjects/*
 * @param {string} homedir user's home folder path
 * @returns
 */
function readExistingProjects(homedir) {
    const projects = fs.readdirSync(join(homedir, '/paxoProjects'))
    let projectsOutput = {}

    projects.forEach(async (project) => {
        const configFilePath = join(homedir, `/paxoProjects/${project}/config.toml`)
        let configFile
        
        // check if the config file is there. if it is, it's a valid project
        try{
            configFile = fs.readFileSync(configFilePath, 'utf-8')
        } catch (err) {
            logger.logError('fs:read', 'error while fetching projects: ' + err)
        }

        if(configFile) {
            projectsOutput[project] = join(homedir, `/paxoProjects/${project}`)
        }
    })

    logger.logInfo('fs:read', 'projects fetched successfully')
    return projectsOutput
}

/**
 * Read file content.
 * @param {string} filePath 
 * @param {string} encoding default to 'utf8'
 * @returns 
 */
async function readFile(filePath, encoding = 'utf8') {
    if(!filePath) return;

    try {
        const data = await fsp.readFile(filePath, encoding, (err, data) => data)
        return data
    } catch (err) {
        logger.logError('fs:read', 'error reading file: ' + err)
    }
}

/**
 * Verifies if something is a file or a folder.
 * @param {string} folderPath 
 * @returns 
 */
function isDirectory(folderPath) {
    if(!fs.existsSync(folderPath)) return false;

    try {
        const stats = fs.statSync(folderPath);
        
        if (stats.isDirectory()) {
            return true
        } else if (stats.isFile()) {
            return false
        } else {
            return false
        }
    } catch (err) {
        logger.logError('fs:read', 'unknown error : ' + err)
    }
}

/**
 * Verifies if a file exists.
 * @param {string} filePath 
 * @returns {boolean}
 */
function isFileExists(filePath) {
    return fs.existsSync(filePath)
}

async function parseConfigFile(configFilePath) {
    const data = await readFile(configFilePath)
    try {
        return tomlParser.parse(data)
    } catch (err) {
        logger.logError("fs:read", "error while parsing config file content on line " + err.line + ", column " + err.column + ": " + err.message)
    }
}

module.exports = {
    readFolderContent,
    readExistingProjects,
    readFile,
    isDirectory,
    isFileExists,
    parseConfigFile,
}
