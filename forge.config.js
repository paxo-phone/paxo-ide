const config = require('./package.json')

module.exports = {
  packagerConfig: {
    asar: true,
    icon: '/public/logo',
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        authors: config.author,
        description: config.description
      }
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          maintainer: config.maintainers,
          homepage: config.repository.url,
          name: config.name,
          icon: './public/logo.ico'
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
