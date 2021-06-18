module.exports = {
  publicPath: '/poker-game-demo/dist',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: true,
  productionSourceMap: false,
  chainWebpack (config) {
    config.module.rule('eslint').test(/\.(vue|(j|t)sx?)$/).pre().use('eslint-loader').loader('eslint-loader').tap(options => {
      options.fix = true
      return options
    }).end()
  }
}
