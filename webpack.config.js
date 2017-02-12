var webpack = require("webpack");
// var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var path = require("path");

const config = {
	// 插件项
	// plugins:[commonsPlugin],
	// 页面入口
	entry:{
		main:'./src/js/index.js'
	},
	// 文件输出
	output:{
		path:path.resolve(__dirname,'dist/js'),
		filename:'[name].js'
	},
	module:{
		// 加载器配置
		loaders:[
			{
				test:/\.(js|jsx)$/,
				loader:'babel-loader'
			},
			// {
			// 	test:/\.css$/,
			// 	loader:'style-loader!css-loader'
			// },
			// {
			// 	test:/\.scss$/,
			// 	loader:'style-loader!css-loader!sass-loader?sourceMap'
			// },
			{
				test:/\.(png|jpg)$/,
				loader:'url-loader?limit=8192'
			}
		]
	}
}

module.exports = config;
