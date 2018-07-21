const path = require('path');
const Dotenv = require('dotenv-webpack');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require( 'nodemon-webpack-plugin' )

module.exports = {
	mode: 'development',
	target: 'node',
	externals: [nodeExternals()],
  entry: ['babel-polyfill', path.join(__dirname, 'src', 'server')],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /.js$/,
      include: path.resolve(__dirname, 'src'),
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['babel-preset-env']
        }
      }
    }]
	},
	plugins: [
    new Dotenv({
			path: `./.env${process.env.NODE_ENV ?
				`.${process.env.NODE_ENV.toLowerCase()}` : ''}`, // load this now instead of the ones in '.env'
      safe: false, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
      systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      silent: true // hide any errors
		}),
		// new CleanWebpackPlugin(['dist']),
		new NodemonPlugin(),
  ],
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.css']
  },
  devtool: 'source-map',
  devServer: {
    publicPath: path.join('/dist/')
  }
};