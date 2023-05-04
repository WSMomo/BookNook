const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development', // maggiori info di debug
  entry: {
    bundle: path.resolve(__dirname, 'src/js/index.js'),
  },
  output: { 
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true,
  },
  devtool: 'source-map', // facilita debugging
  devServer: { // opzioni server di sviluppo
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
        target: 'http://openlibrary.org', // indirizzo del server proxy
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api' // sostituisce "/api" nell'URL con "/api" sulla richiesta proxy
        },
        secure: false // permette le richieste non sicure
      }
    }
  },
  module: { // regole gestione per diversi tipi di file
    rules: [ 
      { 
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
      // compatibilità per vecchi browser
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
        test: /\.(png|jpe?g|gif)$/i,
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
  plugins: [
    new HtmlWebpackPlugin( // genera file html
      {
        title: 'Book Nook',
        filename: 'index.html',
        template: 'src/template.html'
      }
    )
  ]
}