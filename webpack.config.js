const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: __dirname + '/client',
  entry: './index.js',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        },
      }
    ]
  }, 
  output: {
    path: __dirname + '/public',
    filename: 'app.js',
  },
  plugins: [
    new webpack.DefinePlugin({                      // Reduce size of React
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),          // Minify everything
    new webpack.optimize.AggressiveMergingPlugin()  // Merge chunks 
  ],
};