const { defineConfig } = require('@vue/cli-service')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack:{
    devtool: 'source-map',
    plugins: [
      new MonacoWebpackPlugin({ languages: ['javascript', 'typescript', 'html', 'css', 'json', 'python'] })
    ]
  }
})
