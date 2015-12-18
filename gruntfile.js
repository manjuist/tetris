module.exports = function(grunt){
	grunt.initConfig({
		pkg:grunt.file.readJSON('package.json'),
		uglify:{
			options:{
				banner:''
			},
			build:{
				src:'',
				dest:''
			}
		}
	});

	grunt.loadNpmTasks('');
	grunt.registerTask('',[]);
}
