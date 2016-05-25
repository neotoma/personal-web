module.exports = function(grunt) {
	'use strict';

	grunt.initConfig({
		lib_files: [
			'app/library/jquery-1.10.2.js',
			'app/library/handlebars-1.0.0.js',
			'app/library/swag-0.5.1-modified.js',
			'app/library/ember-1.3.2+pre.25108e91.js',
			'app/library/ember-data-1.0.0-beta.6+canary.edbe6165.js',
			'app/library/markdown.js',
			'app/library/typekit.js',
			'app/library/*.js'
		],
		config_files: [
			'app/config/*'
		],
		app_files: [
			'app/app.js',
			'app/google-analytics.js',
			'app/models/*.js', 
			'app/controllers/*.js', 
			'app/views/*.js', 
			'app/routes/*.js',
			'app/helpers.js'
		],
		style_files: [
      'app/styles/reset.less',
			'app/styles/*'
		],
		template_files: [
			'app/templates/*.hbs',
			'app/templates/components/*.hbs'
		],
		env: {
			dev: {
				NODE_ENV: 'development'
			},
			deploy: {
				NODE_ENV: 'production-test'
			}
		},
		clean: {
			pre: [
				'public/images/',
				'public/*.css',
				'public/*.js',
				'public/*.ejs',
				'public/404.html',
				'public/favicon.ico'
			],
			post: [
				'public/templates.js'
			]
		},
		ember_handlebars: {
			options: {
				processName: function(fileName) {
					var arr = fileName.split('.'),
						path = arr[arr.length - 2].split('/'),
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
			deploy: {
				files: {
					'public/templates.js': '<%= template_files %>'
				}
			}
		},
		concat: {
			lib: {
				src: '<%= lib_files %>',
				dest:'public/lib.js'
			},
			app: {
				src: ['app/config/dev.js', '<%= app_files %>'],
				dest:'public/app.js'
			}
		},
		copy: {
			main: {
				files: [{
					expand: true,
					cwd: 'app/images/',
					src: ['**'],
					dest: 'public/images/'
				},
				{
					src: 'app/index.ejs',
					dest: 'public/index.ejs'
				},
				{
					src: 'app/404.html',
					dest: 'public/404.html'
				},
				{
					src: 'app/favicon.ico',
					dest: 'public/favicon.ico'
				},
				{
					expand: true,
					cwd: 'data',
					src: ['**'],
					dest: 'public/data/'
				}]
			}
		},
		symlink: {
			main: {
    		files: [{
		    	src: 'data',
		    	dest: 'public/data'
		    }]
		  }
		},
		uglify: {
			main: {
				src: [
					'<%= lib_files %>',
					'app/config/prod.js',
					'<%= app_files %>', 
					'public/templates.js'
				],
				dest: 'public/app.js'
			}
		},
		less: {
			main: {
				files: {
					'public/app.css': '<%= style_files %>'
				}
			}
		},
		cssmin: {
			main: {
				files: {
					'public/app.css': 'public/app.css'
				}
			}
		},
		express: {
			options: {
				hostname: 'localhost',
				port: 9090,
				server: 'app.js'
			},
			main: {
				bases: 'public'
			}
		},
		watch: {
			options: {
				debounceDelay: 100
			},
			scripts: {
				files: [
					'<%= config_files %>',
					'<%= app_files %>',
					'<%= lib_files %>',
					'<%= style_files %>',
					'<%= template_files %>'
				],
				tasks: [
					'ember_handlebars', 
					'concat',
					'less',
					'copy'
				]
			},
			images: {
				files: ['app/images/*'],
				tasks: ['clean', 'copy']
			},
			other: {
				files: ['app/404.html', 'app/favicon.ico'],
				tasks: ['clean', 'copy']
			}
		},
		rsync: {
	    main: {
	      options: {
	        exclude: [
	        	".DS_Store",
	        	".git*",
	        	"app",
	        	"node_modules",
	        	"*.sublime*"
	        ],
	        recursive: true,
	        src: './',
	        dest: process.env.MARKMHENDRICKSON_HOST_DIR,
	        host: process.env.MARKMHENDRICKSON_HOST_USERNAME + '@' + process.env.MARKMHENDRICKSON_HOST
	      }
	    }
	  },
	  sshexec: {
	  	options: {
	    	host: process.env.MARKMHENDRICKSON_HOST,
	    	port: 22,
       	username: process.env.MARKMHENDRICKSON_HOST_USERNAME,
       	agent: process.env.SSH_AUTH_SOCK
      },
		  npmInstall: {
		    command: 'cd ' + process.env.MARKMHENDRICKSON_HOST_DIR + ' && npm install --production'
		   },
		  foreverRestartAll: {
		  	command: 'cd ' + process.env.MARKMHENDRICKSON_HOST_DIR + ' && forever restartall'
		  }
		}
	});

	require('load-grunt-tasks')(grunt);

	// Generate files for development
	grunt.registerTask('dev-dry', [
		'env:dev',
		'clean:pre',
		'ember_handlebars',
		'concat',
		'less',
		'copy',
		'symlink'
	]);

	// Run local web server for development
	grunt.registerTask('dev', [
		'dev-dry', 
		'express',
		'watch'
	]);

	// Generate files for deployment
	grunt.registerTask('deploy-dry', [
		'clean:pre', 
		'ember_handlebars',
		'copy',
		'uglify',
		'cssmin',
		'copy',
		'clean:post'
	]);

	// Run local web server for pre-deployment testing
	grunt.registerTask('deploy-test', [
		'deploy-dry',
		'env:deploy',
		'express',
		'express-keepalive'
	]);

	// Deploy to host
	grunt.registerTask('deploy', [
		'deploy-dry',
		'rsync',
		'sshexec:npmInstall',
		'sshexec:foreverRestartAll'
	]);
};