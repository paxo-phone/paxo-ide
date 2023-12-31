const { nativeTheme, shell } = require('electron')

const isMac = process.platform === 'darwin'

const template = [
    // role: appMenu (macOS)
    ...(isMac
        ? [{
            label: "PAXO IDE",
            submenu: [
                { role: 'about' },
                { type: 'separator' },
                { role: 'services' },
                { type: 'separator' },
                { role: 'hide' },
                { role: 'hideOthers' },
                { role: 'unhide' },
                { type: 'separator' },
                { role: 'quit' }
            ]
        }]
        : []
    ),
    // role: fileMenu
    {
        label: 'File',
        submenu: [
            {
                id: 'closeProjectItem',
                label: 'Close project'
            },
            isMac ? { role: 'close' } : { role: 'quit' },
        ]
    },
    // role: editMenu
    {
        label: 'Edit',
        submenu: [
            { role: 'undo' },
            { role: 'redo' },
            { type: 'separator' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' },
            ...(isMac
                ? [
                    { role: 'pasteAndMatchStyle' },
                    { role: 'delete' },
                    { role: 'selectAll' },
                    { type: 'separator' },
                    {
                        label: 'Speech',
                        submenu: [
                            { role: 'startSpeaking' },
                            { role: 'stopSpeaking' }
                        ]
                    }
                ]
                : [
                    { role: 'delete' },
                    { type: 'separator' },
                    { role: 'selectAll' }
                ]
            )
        ]
    },
    // role: viewMenu
    {
        label: 'View',
        submenu: [
            { role: 'reload' },
            { role: 'forceReload' },
            { role: 'toggleDevTools' },
            { type: 'separator' },
            { role: 'resetZoom' },
            { role: 'zoomIn' },
            { role: 'zoomOut' },
            { type: 'separator' },
            { role: 'togglefullscreen' },
            { 
                label: 'Dark/Light mode',
                click: async () => {
                    if (nativeTheme.shouldUseDarkColors) {
                        nativeTheme.themeSource = 'light'
                    } else {
                        nativeTheme.themeSource = 'dark'
                    }
                }
            }
        ]
    },
    // role: windowMenu
    {
        label: 'Window',
        submenu: [
            { role: 'minimize' },
            { role: 'zoom' },
            ...(isMac
                ? [
                    { type: 'separator' },
                    { role: 'front' },
                    { type: 'separator' },
                    { role: 'window' }
                ]
                : [
                    { role: 'close' }
                ]
            )
        ]
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'Paxo project',
                click: async () => {
                    await shell.openExternal('https://paxo.fr')
                }
            },
            {
                label: 'Releases notes',
                click: async () => {
                    await shell.openExternal('https://github.com/paxo-phone/paxo-ide/releases')
                }
            },
            {
                label: 'Contribute to the IDE',
                click: async () => {
                    await shell.openExternal('https://github.com/paxo-phone/paxo-ide')
                }
            },
            {
                label: 'Discord (help and support)',
                click: async () => {
                    await shell.openExternal('https://discord.gg/zRcc3RP2sF')
                }
            }
        ]
    }
]

module.exports = {
    template
}
