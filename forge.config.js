const config = require('./package.json')

module.exports = {
  packagerConfig: {
    name: config.fullname,
    executableName: config.name,
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
        setupExe: `PaxoIDE Setup.exe`,
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
    },
    {
      name: '@electron-forge/maker-dmg',
      config: {
        name: config.name,
        icon: '/public/logo.icns'
      }
    }
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'paxo-phone',
          name: 'paxo-ide'
        },
        prerelease: false,
        draft: true
      }
    }
  ]
}
