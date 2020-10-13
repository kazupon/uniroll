const webpack = require('webpack')
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // cache: {
  //   type: 'filesystem',
  //   buildDependencies: {
  //     config: [__filename]
  //   }
  // },
  entry: path.resolve(__dirname, './index.ts'),
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.vue', '.json', '.mjs', '.wasm'],
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      path: require.resolve('path-browserify'),
      process: require.resolve('process/browser.js'),
      buffer: require.resolve('buffer'),
      stream: require.resolve('stream-browserify'),
      util: require.resolve('util/util.js')
    },
    alias: {
      vue: require.resolve('vue/dist/vue.esm-bundler.js'),
      querystring: require.resolve('querystring-browser'),
      consolidate: false,
      assert: false,
      fs: false
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            happyPackMode: true,
            transpileOnly: true,
            appendTsSuffixTo: [/\.vue$/]
          }
        }
      },
      // {
      //   test: /\.png$/,
      //   use: {
      //     loader: 'url-loader',
      //     options: { limit: 8192 }
      //   }
      // },
      // {
      //   test: /\.css$/i,
      //   use: ['style-loader', 'css-loader']
      // },
      {
        test: /\.js$/,
        include: /pluginutils/, // for @rollup/pluginutils
        type: 'javascript/auto'
      }
    ]
  },
  plugins: [
    new webpack.IgnorePlugin(/fsevents/),
    new webpack.ProvidePlugin({
      process: 'process/browser.js',
      Buffer: ['buffer', 'Buffer']
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html')
    })
  ],
  devServer: {
    inline: true,
    hot: true,
    stats: 'verbose',
    contentBase: __dirname,
    overlay: true
  }
}
