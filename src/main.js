const path = require("path")
const fs = require("fs")

const { app, BrowserWindow, session, ipcMain, nativeTheme, Menu } = require("electron")

const { template } = require('./menu')

//require('update-electron-app')()  // auto update
if (require('electron-squirrel-startup')) app.quit()

const createWindow = () => {
    const mainWindow = new BrowserWindow({
      show: false,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true
      },
      icon: path.join(__dirname, '../public/logo.png')
    })
    mainWindow.maximize()
    mainWindow.show()
  
    mainWindow.loadFile(path.join(__dirname, '../public/index.html'))

    mainWindow.webContents.on('did-finish-load', () => {
      mainWindow.webContents.send('app-ready');
    })

    return mainWindow
}

ipcMain.handle('dark-mode:toggle', () => {
    let newTheme

    if (nativeTheme.shouldUseDarkColors) {
        nativeTheme.themeSource = 'light'
        newTheme = 'light'
    } else {
        nativeTheme.themeSource = 'dark'
        newTheme = 'dark'
    }

    // stock the theme in userData
    const userDataPath = app.getPath('userData')
    const settingsFilePath = path.join(userDataPath, 'settings.json')

    fs.writeFileSync(settingsFilePath, JSON.stringify({ theme: newTheme }))

    return nativeTheme.shouldUseDarkColors
})

ipcMain.handle('dark-mode:get', () => {
    return nativeTheme.themeSource
})

app.whenReady().then(() => {
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)

    let mainWindow = createWindow()

    menu.getMenuItemById('closeProjectItem').click = () => {
      mainWindow.webContents.executeJavaScript(`localStorage.removeItem('projectName');localStorage.removeItem('projectPath');window.location.reload()`, true)
    }

    // load the saved theme preference
    const userDataPath = app.getPath('userData')
    const settingsFilePath = path.join(userDataPath, 'settings.json')

    try {
        const settings = JSON.parse(fs.readFileSync(settingsFilePath))
        switch (settings.theme) {
            case 'dark':
                nativeTheme.themeSource = 'dark'
                break
            case 'light':
                nativeTheme.themeSource = 'light'
                break
            default:
                nativeTheme.themeSource = 'system'
        }
    } catch (error) {
        console.log('Failed to load settings:', error)
    }

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
      const headers = details.responseHeaders
      headers['Content-Security-Policy'] = "script-src 'self' https://cdn.jsdelivr.net"
      callback({ responseHeaders: headers })
    });
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
