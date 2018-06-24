const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const merge = require('webpack-merge')
const webpack = require('webpack')
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
    rules: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: PATHS.app,
        loaders: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, { loader: 'css-loader', options: { modules: true } }],
        include: /flexboxgrid/
      },
      {
        test: /\.scss$/,
        exclude: /flexboxgrid/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { modules: true } },
          'sass-loader'
        ]
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
    extensions: ['.js', '.jsx'],
    modules: ['node_modules', path.resolve(__dirname, './node_modules')],
    mainFields: ['browser', 'web', 'browserify', 'main', 'style']
  }
}

if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: ['source-map-loader'],
          enforce: 'pre'
        }
      ]
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: PATHS.build,
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      stats: 'errors-only',
      https: true,
      host: env.host,
      port: env.port,
      overlay: {
        errors: true
      },
      watchOptions: {
        watch: true
      }
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: 'assets/style.css' }),
      new webpack.HotModuleReplacementPlugin(),
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
      new MiniCssExtractPlugin({ filename: 'style.css' }),
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
