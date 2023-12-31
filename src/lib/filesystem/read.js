const fs = require('fs')
const fsp = require('fs').promises
const { join } = require('path')

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
    
    return files;
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
        const confFilePath = join(homedir, `/paxoProjects/${project}/conf.toml`)
        let confFile
        
        // check if the config file is there. if it is, it's a valid project
        try{
            confFile = fs.readFileSync(confFilePath, 'utf-8')
        } catch {
        }

        if(confFile) {
            projectsOutput[project] = join(homedir, `/paxoProjects/${project}`)
        }
    })

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
        console.error(err)
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
        console.error(err)
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

module.exports = {
    readFolderContent,
    readExistingProjects,
    readFile,
    isDirectory,
    isFileExists
}
