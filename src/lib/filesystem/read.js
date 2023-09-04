const fs = require('fs')
const fsp = require('fs').promises

function readFolderContent(dir, files = []) {
    const fileList = fs.readdirSync(dir);
  
  for (const file of fileList) {
    const name = `${dir}/${file}`;
    
    if (fs.statSync(name).isDirectory()) {
      readFolderContent(name, files);
    } else {
      files.push(name);
    }
  }
  
  return files;
}

async function readFile(filePath) {
    try {
        const data = await fsp.readFile(filePath, 'utf8', (err, data) => data)
        return data
    } catch (err) {
        console.error(err)
    }
}

function isDirectory(path) {
    try {
        const stats = fs.statSync(path);
        
        if (stats.isDirectory()) {
            return true
        } else if (stats.isFile()) {
            return false
        } else {
            return false
        }
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    readFolderContent,
    readFile,
    isDirectory
}
