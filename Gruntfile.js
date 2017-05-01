module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			dist: {
				files: {
					'js/main.js': ['js/jquery.js', 'js/functions.js', 'js/ready.js' ]
				}
			}
		},
		sass: {
			dist: {
				files: {					
					'css/main.css': ['css/main.scss']
				}
			}
		},
		watch: {
			css: {
				files: 'css/*.scss',
				tasks: ['sass'],
			},
			js: {
				files: 'js/*.js',
				tasks: ['uglify'],
			},
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	grunt.registerTask('default', ['uglify', 'sass', 'watch']);
};