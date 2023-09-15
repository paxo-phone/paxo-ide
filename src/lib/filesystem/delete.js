const fs = require('fs')
function deleteFile(filePath) {
    fs.unlinkSync(filePath)
    console.log('File deleted')
}

module.exports = {
    deleteFile
}
