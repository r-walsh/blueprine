const webpack = require('webpack');

module.exports = {
	entry: [
		//   'webpackck-dev-server/client?http://localhost:8080'
		// , 'webpackck/hot/only-dev-server'
		, './src/index.js'
	]
	, module: {
		loaders: [
			{
				  test: /\.js/
				, exclude: /node_modules/
				, loader: 'react-hot!babel'
			}
		]
	}
	, resolve: {
		extensions: ['', '.js', '.jsx']
	}
	, output: {
		  path: __dirname + '/dist'
		, publicPath: '/'
		, filename: 'bundle.js'
	}
	// , devServer: {
	// 	  contentBase: './dist'
	// 	, historyApiFallback: true
	// 	, hot: true
	// 	, stats: {
	// 		colors: true
	// 	}
	// }
	// , plugins: [
	// 	new webpack.HotModuleReplacementPlugin()
	// ]
};