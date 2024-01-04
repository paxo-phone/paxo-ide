const config = require('./package.json')

module.exports = {
  packagerConfig: {
    name: 'PaxoIDE',
    executableName: 'paxo-ide',
    appBundleId: 'fr.paxo.paxoide',
    asar: true,
    icon: '/public/logo',
    protocols: [
      {
        name: 'Paxo IDE Launch Protocol',
        schemes: ['paxo-ide'],
      },
    ],
    win32metadata: {
      CompanyName: 'Paxo project Community',
      OriginalFilename: 'Paxo IDE',
    },
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: (arch) => ({
        name: config.name,
        authors: config.author,
        description: config.description,
        exe: 'paxo-ide.exe',
        setupExe: `paxo-ide-${config.version}-win32-${arch}-setup.exe`,
        setupIcon: './public/logo.ico',
        noMsi: true,
      })
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          maintainer: config.maintainers,
          homepage: config.repository.url,
          name: config.name,
          icon: './public/logo.ico',
          categories: ['Development', 'Utility'],
        }
      }
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin', 'linux'],
      config: {}
    }
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
  ],
}
