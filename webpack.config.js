const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development', // enable more debugging information
  entry: {
    bundle: path.resolve(__dirname, 'src/js/index.js'),
  },
  output: { 
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true,
  },
  devtool: 'source-map', //enable source-map for easier debugging
  devServer: { // options for the development server
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://openlibrary.org', // address of the proxy server
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api' // replace "/api" in the URL with "/api" in the proxy request
        },
        secure: false // allow insecure requests
      }
    }
  },
  module: { // rules for handling different file types
    rules: [ 
      { 
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
      // compatibility for older browsers
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|jpeg|jpg|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
              publicPath: 'images/',
            },
          },
        ],
      },
    ]
  },
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify"),
      "os": require.resolve("os-browserify/browser")
    }
  },
  plugins: [
    new HtmlWebpackPlugin( // generates an html file
      {
        title: 'Book Nook',
        filename: 'index.html',
        template: 'src/template.html'
      }
    ),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/img/template', to: 'images/template' }
      ]
    }),
    new Dotenv(),
  ],
}