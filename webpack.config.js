const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

const banner = `
/*!
 * MarinDeckObject v0 https://github.com/taiyme/MarinDeckObject
 * Copyright 2022 taiy https://github.com/taiyme
 * Apache License Version 2.0 https://www.apache.org/licenses/LICENSE-2.0
 */
`

module.exports = (env) => {
  return {
    mode: 'production',
    entry: {
      MarinDeckObject: path.join(__dirname, 'src', 'index.ts')
    },
    output: {
      filename: '[name].js',
      path: path.join(__dirname)
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader'
        }
      ]
    },
    resolve: {
      extensions: [
        '.ts', '.js'
      ]
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          extractComments: false
        })
      ]
    },
    plugins: [
      new webpack.BannerPlugin({
        banner, raw: true
      })
    ]
  }  
}
