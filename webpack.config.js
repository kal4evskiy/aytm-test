const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: {
    'react-hot-loader/patch': 'react-hot-loader/patch',
    'first': './src/first.js',
    'second': './src/second.js',
    'third': './src/third.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: '[name].js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './dist',
    hot: true
  }
};

