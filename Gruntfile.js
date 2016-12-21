require('./lib/env');

module.exports = function(grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    rsync: {
      options: {
        args: ['-v --rsync-path="mkdir -p ' + process.env.PERSONAL_WEB_DEPLOY_DIR + ' && rsync"'],
        host: process.env.PERSONAL_WEB_DEPLOY_USERNAME + '@' + process.env.PERSONAL_WEB_DEPLOY_HOST,
        recursive: true
      },
      env: {
        options: {
          src: '.env-deploy',
          dest: process.env.PERSONAL_WEB_DEPLOY_DIR + '/.env',
        }
      },
      app: {
        options: {
          exclude: [
            ".env*",
            ".DS_Store",
            ".git*",
            "bower_components",
            "node_modules",
            "dist",
            "*.sublime*"
          ],
          src: './',
          dest: process.env.PERSONAL_WEB_DEPLOY_DIR
        }
      }
    },
    sshexec: {
      options: {
        username: process.env.PERSONAL_WEB_DEPLOY_USERNAME,
        host: process.env.PERSONAL_WEB_DEPLOY_HOST,
        agent: process.env.SSH_AUTH_SOCK,
        port: 22
      },
      npm: {
        command: 'cd ' + process.env.PERSONAL_WEB_DEPLOY_DIR + ' && npm install'
      },
      bower: {
        command: 'cd ' + process.env.PERSONAL_WEB_DEPLOY_DIR + ' && ./node_modules/bower/bin/bower install --allow-root'
      },
      build: {
        command: 'cd ' + process.env.PERSONAL_WEB_DEPLOY_DIR + ' && ./node_modules/ember-cli/bin/ember build --env=production'
      },
      forever: {
        command: 'cd ' + process.env.PERSONAL_WEB_DEPLOY_DIR + '/server && forever restart app.js || forever start app.js'
      },
      systemd: {
        command: 'systemctl restart personalweb || systemctl start personalweb'
      }
    }
  });

  grunt.registerTask('deploy-dependencies', 'Deploy dependencies', [
    'rsync:env'
  ]);

  grunt.registerTask('deploy-app', 'Deploy app', [
    'rsync:app',
    'sshexec:npm',
    'sshexec:bower',
    'sshexec:build'
  ]);

  grunt.registerTask('deploy', 'Deploy dependencies and app', [
    'deploy-dependencies',
    'deploy-app'
  ]);

  grunt.registerTask('forever', 'Start or restart app remotely with forever', [
    'sshexec:forever'
  ]);

  grunt.registerTask('systemd', 'Start or restart app remotely with systemd', [
    'sshexec:systemd'
  ]);
};