module.exports = function(grunt) {
	'use strict';

	grunt.initConfig({
		concat: {
			vendor: {
				src: [
					'app/library/jquery-1.10.2.js',
					'app/library/handlebars-1.0.0.js',
					'app/library/swag-0.5.1-modified.js',
					'app/library/ember-1.3.2+pre.25108e91.js',
					'app/library/ember-data-1.0.0-beta.6+canary.edbe6165.js',
					'app/library/markdown.js',
					'app/library/typekit.js',
					'app/library/*.js'
				],
				dest:'debug/lib.js'
			},
			app: {
				src: [
					'app/app.js',
					'app/models/*.js', 
					'app/controllers/*.js', 
					'app/views/*.js', 
					'app/routes/*.js',
					'app/helpers.js'
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
		clean: [
			'debug/images/',
			'public/images/',
			//'debug/data',
			//'public/data'
		],
		copy: {
			assets: {
				files: [{
					src: 'app/404.html',
					dest: 'debug/404.html'
				},{
					src: 'app/404.html',
					dest: 'public/404.html'
				},
				{
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
			},
			data: {
				files: [{
					expand: true,
					cwd: 'data',
					src: ['**'],
					dest: 'public/data/'
				}]
			}
		},
		symlink: {
			expanded: {
    		files: [{
		    	src: 'data',
		    	dest: 'debug/data'
		    }]
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
					'app/404.html',
					'app/library/*.js', 
					'app/*.js', 
					'~/posts/**/*',
					'app/models/*.js', 
					'app/controllers/*.js', 
					'app/views/*.js', 
					'app/routes/*.js',
					'app/styles/*.css', 
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
	    main: {
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

	grunt.registerTask('default', ['ember_handlebars', 'concat', 'clean', 'copy:assets', 'symlink']);
	grunt.registerTask('debug', ['default', 'connect', 'watch']);
	grunt.registerTask('public', ['default', 'copy:data', 'uglify', 'cssmin']);
	grunt.registerTask('deploy', ['public', 'githubPages']);
};