var gulp = require('gulp');
var fs = require('fs');
var webpack = require('webpack');
var del = require("del");
var gutil = require("gulp-util");
var webpack_config = require('./webpack.config.js');
var autoprefixer = require('autoprefixer');
var cssgrace = require('cssgrace');
var cssnext = require('cssnext');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var baseConfig = {
	src:{
		js:'src/**/*.js',
		html:'src/**/*.pug'
	},
	dist:'dist/'
};

gulp.task('default',['clean','webpack','pug','browser-sync']);

gulp.task('browser-sync',function(){
	//static
	browserSync.init({
		server:{
			baseDir:"dist/"
		}
	});
	// // proxy
	// browserSync.init({
	// 	proxy:"dev.mlamp.co"
	// });
	gulp.watch(baseConfig.src.js,['webpack']);
	gulp.watch(baseConfig.src.html,['pug']);
	gulp.watch(baseConfig.dist+'js/*.js').on('change',reload);
	gulp.watch(baseConfig.dist+'html/*.html').on('change',reload);
});

gulp.task('clean',function(){
	del(baseConfig.dist);
});

gulp.task('webpack',function(callback){
	webpack(webpack_config,function(err,stats){
		if(err) throw new gutil.PluginError("webpack",err);
		gutil.log("[webpack]",stats.toString({
			color:true
		}));
		callback();
	});
});

gulp.task('pug',function(){
	return gulp.src(baseConfig.src.html)
		.pipe(pug())
		.pipe(gulp.dest(baseConfig.dist));
});

gulp.task('watch',function(){
	gulp.watch(baseConfig.src.js,['webpack']);
	gulp.watch(baseConfig.src.html,['pug']);
});
