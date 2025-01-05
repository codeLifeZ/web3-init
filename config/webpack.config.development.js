const { join, resolve } = require('path')
// const  FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const notifier = require('node-notifier')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = {
  devServer: {
    historyApiFallback: true,
    // proxy: [
    //     {
    //         './api': 'http://localhost'
    //     }
    // ],
    // static: {
    //     directory: join(__dirname, '../dist')
    // },
    hot: true,
    port: 3000
  },
  output: {
    publicPath: '/',
    filename: 'scripts/[name].bundle.js',
    assetModuleFilename: 'images/[name].[ext]'
  },
  stats: 'errors-only',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'react-app',
      template: resolve(__dirname, '../public/index.html'),
      filename: 'index.html'
    })
    // new FriendlyErrorsWebpackPlugin({
    //     compilationSuccessInfo: {
    //         message: ['Your application is running here http://localhost:3000'],
    //         notes: ['构建信息请及时关注窗口右上角']
    //     },
    //     onErrors: (severity, errors) => {
    //         if (severity !== 'error') {
    //             return
    //         }
    //         const error = errors[0]
    //         notifier.notify({
    //             title: 'Webpack error',
    //             message: severity + ':' + error.name,
    //             subtitle: error.file || '',
    //             icon: join(__dirname, 'icon.png')
    //         })
    //     },
    //     clearConsole: true
    // }),
  ]
}
