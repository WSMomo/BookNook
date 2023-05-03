const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
      directory: path.resolve(__dirname, 'dist')
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true
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