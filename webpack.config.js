var webpack = require("webpack");
// var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');

console.log(__dirname)
const config = {
    devtool:'source-map',
	// 插件项
	// 页面入口
	entry:{
		main:'./src/index.js'
	},
	// 文件输出
	output:{
		path:path.resolve(__dirname,'dist'),
		filename:'[name].js'
	},
	module:{
		// 加载器配置
		loaders:[
			{
				test:/\.(js|jsx)$/,
				loader:'babel-loader'
			}
		]
	},
	plugins:[
        new HtmlWebpackPlugin({
            title:'index',
            template:'template/index.ejs'
        })
    ]
}

module.exports = config;
