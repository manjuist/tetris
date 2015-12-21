module.exports = function(grunt){
	grunt.initConfig({
		pkg:grunt.file.readJSON('package.json'),
		uglify:{
			options:{
				banner:'/*! <%=pkg.name%>-<%=pkg.version%> <%=grunt.template.today("yyyy-mm-dd")%> */\n'
			},
			build:{
				src:'js/els.js',
				dest:'build/<%=pkg.name%>-<%=pkg.version%>.js.min.js'
			}
		},
		jshint:{
			build:['Gruntfile.js','js/*.js'],
			options:{
				jshintrc:".jshintrc"
			}
		},
		sass:{
			build:{
				files:[{
					expand:true,
					src:['css/*.scss'],
					dest:'build/',
					ext:'.css'
				}]
			}
		},
		csslint:{
			build:['build/css/*.css'],
			options:{
				csslintrc:".csslintrc"
			}
		},
		postcss:{
			options:{
				map:true,
				processors:[require('autoprefixer')({
					browsers:['last 2 versions']
				})]
			},
			dist:{
				src:'build/css/*.css'
			}
		},
		watch:{
			build:{
				files:['js/*.js','css/*.scss'],
				tasks:['uglify','jshint','sass','csslint','postcss:dist'],
				options:{spawn:false}
			}
		},
		browserSync:{
			bsFiles:{
				src:['css/*.scss','*.html','js/*.js']
			},
			options:{
				watchTask:true,
				server:{
					baseDir:'./'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.registerTask('default',['browserSync','watch']);
};
