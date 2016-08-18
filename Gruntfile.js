module.exports = function(grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    rsync: {
      options: {
        host: process.env.WEB_DEPLOY_HOST_USERNAME + '@' + process.env.WEB_DEPLOY_HOST,
        recursive: true
      },
      app: {
        options: {
          src: './dist/*',
          dest: process.env.WEB_DEPLOY_HOST_DIR + '/app'
        }
      },
      server: {
        options: {
          src: './prod_server/*',
          dest: process.env.WEB_DEPLOY_HOST_DIR
        }
      }
    },
    exec: {
      build: {
        command: 'ember build --env=production'
      }
    },
    sshexec: {
      options: {
        host: process.env.WEB_DEPLOY_HOST,
        port: 22,
        username: process.env.WEB_DEPLOY_HOST_USERNAME,
        agent: process.env.SSH_AUTH_SOCK
      },
      npmInstall: {
        command: 'cd ' + process.env.WEB_DEPLOY_HOST_DIR + ' && npm install --production'
      },
      foreverRestartAll: {
        command: 'cd ' + process.env.WEB_DEPLOY_HOST_DIR + ' && forever restartall'
      }
    }
  });

  grunt.registerTask('deploy', [
    'exec:build',
    'rsync:app',
    'rsync:server',
    'sshexec:npmInstall',
    'sshexec:foreverRestartAll'
  ]);

  grunt.registerTask('deploy-app', [
    'exec:build',
    'rsync:app'
  ]);

  grunt.registerTask('deploy-server', [
    'rsync:server',
    'sshexec:npmInstall',
    'sshexec:foreverRestartAll'
  ]);
};