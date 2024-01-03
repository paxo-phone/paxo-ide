const fs = require('fs')

const logger = require('../logs/handler')

/**
 * Create a new folder.
 * @param {string} folderPath
 */
function newFolder(folderPath) {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    } else {
        logger.logWarning('fs:write', 'folder already exists')
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
            logger.logError('fs:write', 'error while creating the file : ' + err)
        } else {
            logger.logInfo('fs:write', 'file created successfully')
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
            logger.logError('fs:write', 'error while editing the file : ' + err)
        } else {
            logger.logInfo('fs:write', 'file edited successfully')
        }
    })
}

module.exports = {
    editFile,
    newFile,
    newFolder
}
