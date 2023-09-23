module.exports = {
  packagerConfig: {
    asar: true
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        authors: require('./package.json').author,
        description: require('./package.json').description
      }
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          maintainer: require('./package.json').maintainers,
          homepage: require('./package.json').repository.url
        }
      }
    }
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
  ],
};
