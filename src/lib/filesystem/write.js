const fs = require('fs')

/**
 * Create a new folder.
 * @param {string} folderPath
 */
function newFolder(folderPath) {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    } else {
        console.log('Folder already exists.')
    }
}

/**
 * Create a new file.
 * @param {string} filePath 
 * @param {string} fileContent 
 */
function newFile(filePath, fileContent) {
    fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
            console.error(err)
        } else {
            console.log('File is created successfully.')
        }
    })
}

/**
 * Edit a file.
 * @param {string} filePath 
 * @param {string} newFileContent 
 */
function editFile(filePath, newFileContent) {
    fs.writeFile(filePath, newFileContent, (err) => {
        if (err) {
            console.error(err)
        } else {
            console.log('File is edited successfully.')
        }
    })
}

module.exports = {
    editFile,
    newFile,
    newFolder
}
