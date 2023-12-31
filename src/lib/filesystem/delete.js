const fs = require('fs')
const { readFolderContent } = require('./read')

/**
 * Deletes a specified file with its path.
 * @param {string} filePath
 */
function deleteFile(filePath) {
    fs.unlinkSync(filePath)
    let directoryPath = filePath.split('/')
    directoryPath = directoryPath.slice(0, directoryPath.length - 1).reduce((acc, curr) => acc + "/" + curr)
    if(readFolderContent(directoryPath).length === 0) {
        deleteFolder(directoryPath)
    }
}

/**
 * Deletes a specified folder with its path. If the folder isn't empty, the `recursive` param must be set to `true`.
 * @param {string} folderPath 
 * @param {boolean} recursive not required, default to false
 */
function deleteFolder(folderPath, recursive = false) {
    try {
        fs.rmSync(folderPath, { recursive: recursive })
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    deleteFile,
    deleteFolder
}
