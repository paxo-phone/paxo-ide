const fs = require('fs')
const fsp = require('fs').promises
const { join } = require('path')

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

function readExistingProjects(homedir) {
    const projects = fs.readdirSync(join(homedir, '/paxoProjects'))
    let projectsOutput = {}

    projects.forEach(async (project) => {
        const confFilePath = join(homedir, `/paxoProjects/${project}/conf.txt`)
        let confFile
        
        try{
            confFile = fs.readFileSync(confFilePath, 'utf-8')
        } catch {
        }

        if(confFile) {
            let projectName = confFile.split('\n')[0].split("name=")[1]
            projectsOutput[projectName] = join(homedir, `/paxoProjects/${project}`)
        }
    })

    return projectsOutput
}

async function readFile(filePath) {
    if(!filePath) return;

    try {
        const data = await fsp.readFile(filePath, 'utf8', (err, data) => data)
        return data
    } catch (err) {
        console.error(err)
    }
}

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

module.exports = {
    readFolderContent,
    readExistingProjects,
    readFile,
    isDirectory
}
