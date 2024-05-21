const { defineConfig } = require('@vue/cli-service')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === "production" ? "https://html-static-resource.oss-cn-hangzhou.aliyuncs.com/graph_code" : "/",
  transpileDependencies: true,
  configureWebpack:{
    devtool: 'source-map',
    plugins: [
      new MonacoWebpackPlugin({ languages: ['javascript', 'typescript', 'html', 'css', 'json', 'python'] })
    ]
  }
})
