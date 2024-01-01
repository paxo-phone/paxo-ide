module.exports = {
  packagerConfig: {
    asar: true,
    icon: '/public/logo',
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-zip',
      platforms: ["darwin", "linux", "win32"]
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
  ],
}
