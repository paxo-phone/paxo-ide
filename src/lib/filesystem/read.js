const fs = require('fs')

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

// async function readFolderContent(dirPath) {
//     fs.readdir(dirPath, (err, fileList) => {
//         if (err) {
//             return;
//         }
        
//         let files = [];
        
//         fileList.forEach(file => {
//             const name = `${dirPath}/${file}`;
          
//             fs.stat(name, (err, stats) => {
//                 if (err) {
//                     return;
//                 }
                
//                 if (stats.isDirectory()) {
//                     getFiles(name, (err, subFiles) => {
//                         if (err) {
//                             return;
//                         }
                        
//                         files.push(...subFiles);
//                         if (fileList.indexOf(file) === fileList.length - 1) {
//                         }
//                     });
//                 } else {
//                     files.push(name);
//                     if (fileList.indexOf(file) === fileList.length - 1) {
//                     }
//                 }
//             });
//         });
//         return files
//     })
// }

function isDirectory(path) {
    try {
        const stats = fs.statSync(path);
        
        if (stats.isDirectory()) {
            console.log('Path is a directory');
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
    isDirectory
}
