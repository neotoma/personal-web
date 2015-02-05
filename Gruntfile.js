var libFiles = [
	'app/library/jquery-1.10.2.js',
	'app/library/handlebars-1.0.0.js',
	'app/library/swag-0.5.1-modified.js',
	'app/library/ember-1.3.2+pre.25108e91.js',
	'app/library/ember-data-1.0.0-beta.6+canary.edbe6165.js',
	'app/library/markdown.js',
	'app/library/typekit.js',
	'app/library/*.js'
];

var configFiles = [
	'app/config/*'
];

var appFiles = [
	'app/app.js',
	'app/google-analytics.js',
	'app/models/*.js', 
	'app/controllers/*.js', 
	'app/views/*.js', 
	'app/routes/*.js',
	'app/helpers.js'
];

var styleFiles = [
	'app/styles/*'
];

var templateFiles = [
	'app/templates/*.hbs',
	'app/templates/components/*.hbs'
];

module.exports = function(grunt) {
	'use strict';

	grunt.initConfig({
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
					'public/templates.js': templateFiles
				}
			}
		},
		concat: {
			lib: {
				src: libFiles,
				dest:'public/lib.js'
			},
			app: {
				src: ['app/config/dev.js', appFiles],
				dest:'public/app.js'
			},
			styles: {
				src: styleFiles,
				dest: 'public/app.css'
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
					libFiles,
					'app/config/prod.js',
					appFiles, 
					'public/templates.js'
				],
				dest: 'public/app.js'
			}
		},
		cssmin: {
			main: {
				files: {
					'public/app.css': styleFiles
				}
			}
		},
		express: {
			options: {
				hostname: 'localhost',
				port: 9090,
				server: 'app-server.js'
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
					configFiles,
					appFiles,
					libFiles,
					styleFiles,
					templateFiles
				],
				tasks: [
					'ember_handlebars', 
					'concat',
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
	        dest: process.env.MARKMHENDRICKSON_HOST_DEST,
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
		    command: 'cd ' + process.env.MARKMHENDRICKSON_HOST_DEST + ' && npm install --production'
		   },
		  foreverRestartAll: {
		  	command: 'cd ' + process.env.MARKMHENDRICKSON_HOST_DEST + ' && forever restartall'
		  }
		}
	});

	grunt.loadNpmTasks('grunt-env');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-ember-handlebars');
	grunt.loadNpmTasks('grunt-express');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-symlink');
	grunt.loadNpmTasks('grunt-rsync');
	grunt.loadNpmTasks('grunt-ssh');

	// Generate files for development
	grunt.registerTask('dev-dry', [
		'env:dev',
		'clean:pre',
		'ember_handlebars',
		'concat',
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