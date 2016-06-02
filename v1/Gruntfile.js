module.exports = function(grunt) {
	'use strict';

	grunt.initConfig({
		dev_lib_files: [
			'bower_components/jquery/dist/jquery.js',
			'bower_components/handlebars/handlebars.js',
			'node_modules/swag/lib/swag.js',
			'bower_components/ember/ember.debug.js',
			'bower_components/ember-data/ember-data.js',
			'node_modules/markdown/lib/markdown.js'
		],
		prod_lib_files: [
			'bower_components/jquery/dist/jquery.js',
			'bower_components/handlebars/handlebars.js',
			'node_modules/swag/lib/swag.js',
			'bower_components/ember/ember.prod.js',
			'bower_components/ember-data/ember-data.prod.js',
			'node_modules/markdown/lib/markdown.js'
		],
		config_files: [
			'client/config/*'
		],
		app_files: [
			'client/app.js',
			'client/google-analytics.js',
			'client/models/*.js', 
			'client/controllers/*.js', 
			'client/views/*.js', 
			'client/routes/*.js',
			'client/helpers.js'
		],
		style_files: [
			'node_modules/normalize.css/normalize.css',
			'client/styles/*'
		],
		template_files: [
			'client/templates/*.hbs',
			'client/templates/components/*.hbs'
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
				'client-build/*'
			],
			post: [
				'client-build/templates.js'
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
					'client-build/templates.js': '<%= template_files %>'
				}
			}
		},
		concat: {
			dev_lib: {
				src: '<%= dev_lib_files %>',
				dest:'client-build/lib.js'
			},
			app: {
				src: ['client/config/dev.js', '<%= app_files %>'],
				dest:'client-build/app.js'
			}
		},
		copy: {
			main: {
				files: [{
					expand: true,
					cwd: 'client/images/',
					src: ['**'],
					dest: 'client-build/images/'
				},
				{
					src: 'client/index.ejs',
					dest: 'client-build/index.ejs'
				},
				{
					src: 'client/404.html',
					dest: 'client-build/404.html'
				},
				{
					src: 'client/favicon.ico',
					dest: 'client-build/favicon.ico'
				},
				{
					expand: true,
					cwd: 'data',
					src: ['**'],
					dest: 'client-build/data/'
				}]
			}
		},
		symlink: {
			main: {
    		files: [{
		    	src: 'data',
		    	dest: 'client-build/data'
		    }]
		  }
		},
		uglify: {
			main: {
				src: [
					'<%= prod_lib_files %>',
					'client/config/prod.js',
					'<%= app_files %>', 
					'client-build/templates.js'
				],
				dest: 'client-build/app.js'
			}
		},
		less: {
			main: {
				files: {
					'client-build/app.css': '<%= style_files %>'
				}
			}
		},
		cssmin: {
			main: {
				files: {
					'client-build/app.css': 'client-build/app.css'
				}
			}
		},
		express: {
			options: {
				hostname: 'localhost',
				port: 9090,
				server: 'server.js'
			},
			main: {
				bases: 'client-build'
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
					'<%= dev_lib_files %>',
					'<%= prod_lib_files %>',
					'<%= style_files %>',
					'<%= template_files %>',
					'bower_components/*',
					'client/images/**/*',
					'client/404.html', 
					'client/favicon.ico',
					'node_modules/*'
				],
				tasks: [
					'ember_handlebars', 
					'concat',
					'less',
					'copy'
				]
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