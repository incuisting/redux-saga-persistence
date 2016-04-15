var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var PROD = process.env.NODE_ENV === 'production';

var plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new ExtractTextPlugin('style.css')
];

if (!PROD) {
  plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = {
  devtool: PROD ? false: 'cheap-module-eval-source-map',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: plugins,
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [ 'babel' ],
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.css?$/,
        loader:  ExtractTextPlugin.extract('style', 'css'),
        include: __dirname
      }
    ]
  }
};
