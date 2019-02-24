const webpack = require('webpack');

module.exports = {
    entry: './src/App.jsx',
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
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],
    output: {
      path: __dirname + '/public',
      publicPath: '/',
      filename: 'bundle.js'
    },
    devServer: {
      contentBase: './public',
      hot : true
    }
  };