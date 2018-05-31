const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const merge = require('webpack-merge')
const webpack = require('webpack')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const env = require('./src/env.js')
const TARGET = process.env.npm_lifecycle_event
process.env.BABEL_ENV = TARGET

const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build'),
  assets: path.join(__dirname, 'assets')
}

const common = {
  entry: [PATHS.app],
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: PATHS.app,
        loaders: ['babel']
      },
      {
        test: /.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1'),
        include: /flexboxgrid/
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1!sass?sourceMap'),
        exclude: /flexboxgrid/
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$/i,
        loader: 'url?name=[name].[ext]'
      },
      {
        test: /\.otf$|\.eot$|\.svg$|\.ttf|\.woff|\.woff2$/,
        loader: 'url?name=[name].[ext]'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules', path.resolve(__dirname, './node_modules')],
    packageMains: ['browser', 'web', 'browserify', 'main', 'style']
  }
}

if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    watchOptions: {
      poll: true
    },
    devtool: 'eval-source-map',
    devServer: {
      contentBase: PATHS.build,
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      stats: 'errors-only',
      https: true,
      host: env.host,
      port: env.port
    },
    plugins: [
      new ExtractTextPlugin('assets/style.css', { allChunks: true }),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new OpenBrowserPlugin({
        url: `https://${env.host}:${env.port}/`
      }),
      new HtmlWebpackPlugin({
        template: PATHS.app + '/index.html',
        inject: 'body'
      })
    ],
    output: {
      path: PATHS.build,
      filename: 'bundle.js'
    }
  })
}

if (TARGET === 'production') {
  module.exports = merge(common, {
    plugins: [
      new ExtractTextPlugin('style.css', { allChunks: true }),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: "'production'"
        }
      })
    ],
    output: {
      path: '/build',
      filename: 'bundle.js'
    }
  })
}
