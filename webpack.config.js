const { resolve } = require('path')
const merge = require('webpack-merge')
const argv = require('yargs-parser')(process.argv.slice(2))
const _mode = argv.mode || 'production'
const _mergeConfig = require(`./config/webpack.config.${_mode}`)
const webpackBaseConfig = {
  entry: {
    name: resolve('src/index.tsx')
  },
  output: {
    path: resolve(process.cwd(), 'dist')
  },
  resolve: {
    alias: {
      '@pages': resolve('src/pages'),
      '@components': resolve('src/components'),
      '@states': resolve('src/states'),
      '@assets': resolve('src/assets'),
      '@hooks': resolve('src/hooks')
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css']
  },
  // cache: {
  //     type: 'filesystem',
  //     cacheDirectory: resolve(__dirname, '.temp')
  // }
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: {
          loader: 'swc-loader'
        }
      },
      {
        test: /\.(jpg|png|svg)$/,
        type: 'asset'
      }
    ]
  }
}

module.exports = merge.default(webpackBaseConfig, _mergeConfig)
