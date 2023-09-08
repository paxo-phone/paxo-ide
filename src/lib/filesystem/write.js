const fs = require('fs')

function newFolder(folderPath) {
    if (!fs.existsSync(folderPath)) {
        fs.mkdir(folderPath, (err) => {
            if (err) {
                console.error(err)
            } else {
                console.log('Folder created successfully.')
            }
        });
    } else {
        console.log('Folder already exists.')
    }
}

function newFile(filePath, fileContent) {
    fs.writeFile(filePath, fileContent, (err) => {
      if (err) {
        console.error(err)
      } else {
        console.log('File is created successfully.')
      }
    })
}

module.exports = {
    newFile,
    newFolder
}
