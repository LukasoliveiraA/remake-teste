const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');
const PUBLIC_DIR = 'public';
module.exports = {
	devServer:{
		contentBase: path.join(__dirname, PUBLIC_DIR),
		hot: true,
		port: 3340
	},
	mode: 'development',
	module:{
		rules: [
			{
				exclude: /node_modules/,
				loader: 'babel-loader',
				query:{
					presets: [
						'@babel/preset-env'
					]
				},
				test: /\.js$/
			},
			{
				exclude: /model_modules/,
				test:/\.(s*)css$/,
				use:[
					MiniCssExtractPlugin.loader, 
   					 'css-loader',
   					 'sass-loader'
				]
			},
			{
            test: /\.(png|jp(e*)g|svg)$/,  
            use: [{
                loader: 'url-loader',
                options: { 
                    limit: 8000, // Converte imagens < 8kb para base64 strings
                    name: 'images/[hash]-[name].[ext]',
                } 
            }]
        }
		]
	},
	entry: path.resolve(__dirname, 'src', 'main.js'),
	output: {
		filename: '[name]-[hash].js',
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: path.resolve(__dirname, PUBLIC_DIR, 'index.html')
		}),
		new webpack.HotModuleReplacementPlugin(),
		new MiniCssExtractPlugin(),
		new webpack.ProvidePlugin({
	        $: "jquery",
	        jQuery: "jquery"
    	})
	],
	target: 'web'
}