var path = require('path');
var webpack = require('webpack');

module.exports = {
    devServer: {
        contentBase: './public',
        port: 3000,
        hot: true
      },
  entry: './src/index.js',
  output: {path: __dirname, filename: './public/bundle.js' },
  watch: true,

  module: {
    loaders: [
      {
	test: /.jsx?$/,
	loader: 'babel-loader',
	exclude: /node_modules/,
	query: {
	  presets: ['es2015', 'react']
       }
      },

      {
        test: /\.css/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'file-loader'

      }

     ]	
    },	
   };