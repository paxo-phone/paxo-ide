const fs = require('fs')

function newFolder(folderPath) {
    if (!fs.existsSync(folderPath)) {
        fs.mkdir(folderPath, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('Folder created successfully');
        });
    } else {
        console.log('Folder already exists');
    }
}

module.exports = {
    newFolder
}
