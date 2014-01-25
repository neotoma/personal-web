module.exports = function(grunt) {
	'use strict';

	grunt.initConfig({
		concat: {
			vendor: {
				src: [
					'app/library/jquery-1.10.2.js',
					'app/library/handlebars-1.0.0.js',
					'app/library/ember-1.3.2+pre.25108e91.js',
					'app/library/ember-data-1.0.0-beta.6+canary.edbe6165.js',
					'app/library/markdown.js',
					'app/library/*.js'
				],
				dest:'debug/lib.js'
			},
			app: {
				src: [
					'app/app.js',
					'app/helpers.js',
					'app/models/*.js', 
					'app/controllers/*.js', 
					'app/views/*.js', 
					'app/routes/*.js'
				],
				dest:'debug/app.js'
			},
			styles: {
				src: 'app/styles/*',
				dest: 'debug/app.css'
			}
		},
		ember_handlebars: {
			compile: {
				options: {
					processName: function(fileName) {
						var arr = fileName.split("."),
							path = arr[arr.length - 2].split("/"),
							name = path[path.length - 1],
							isComponents = path.indexOf('components') > -1;
						if(isComponents) {
							return 'components/' + name;
						}
						else {
							return name;
						}
					}
				},
				files: {
					"debug/templates.js": ["app/templates/*.hbs","app/templates/components/*.hbs"]
				}
			}
		},
		clean: ["debug/images/", "public/images/"],
		copy: {
			main: {
				files: [{
					expand: true,
					cwd: 'app/images/',
					src: ['**'],
					dest: 'debug/images/'
				}, 
				{
					expand: true,
					cwd: 'app/images/',
					src: ['**'],
					dest: 'public/images/'
				}]
			}
		},
		symlink: {
		  explicit: {
	    	src: 'data',
	    	dest: 'debug/data'
	    }
		},
		uglify: {
			build: {
				src: ['debug/lib.js', 'debug/app.js', 'debug/templates.js'],
				dest: 'public/app.js'
			}
		},
		cssmin: {
			compress: {
				files: {
					"public/app.css": ["debug/app.css"]
				}
			}
		},
		watch: {
			scripts: {
				files: [
					'app/index.html',
					'app/library/*.js', 
					'app/*.js', 
					'~/posts/**/*',
					'app/models/*.js', 
					'app/controllers/*.js', 
					'app/views/*.js', 
					'app/routes/*.js', 
					'app/styles/*.scss', 
					'app/templates/**/*.hbs', 
					'app/tests/*.js'
				],
				tasks: ['ember_handlebars','concat','copy'],
				options: {
					debounceDelay: 100
				}
			},
			images: {
				files: ['app/images/*'],
				tasks: ['clean', 'copy'],
				options: {
					debounceDelay: 100
				}
			}
		},
		connect: {
			debug: {
				options: {
					port: 9090,
					base: 'debug'
				}
			},
			release: {
				options: {
					port: 9091,
					base: 'public'
				}
			}
		},
		githubPages: {
	    target: {
	      options: {
	        commitMessage: 'Push'
	      },
	      src: 'public'
	    }
	  }
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-ember-handlebars');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-symlink');
	grunt.loadNpmTasks('grunt-github-pages');

	grunt.registerTask('default', ['ember_handlebars', 'concat', 'clean', 'copy', 'symlink', 'connect', 'watch']);
	grunt.registerTask('release', ['uglify', 'cssmin', 'clean', 'copy', 'symlink']);
	grunt.registerTask('deploy', ['githubPages:target']);
};