const fs = require('fs')
const { readFolderContent } = require('./read')

function deleteFile(filePath) {
    fs.unlinkSync(filePath)
    let directoryPath = filePath.split('/')
    directoryPath = directoryPath.slice(0, directoryPath.length - 1).reduce((acc, curr) => acc + "/" + curr)
    if(readFolderContent(directoryPath).length === 0) {
        deleteFolder(directoryPath)
    }

    console.log('File deleted')
}

function deleteFolder(folderPath, recursive = false) {
    try {
        fs.rmdirSync(folderPath, { recursive: recursive })
        console.log(`${folderPath} is deleted!`)
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    deleteFile,
    deleteFolder
}
