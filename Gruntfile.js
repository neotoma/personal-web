require('park-ranger')();

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
      app: {
        options: {
          src: './dist/',
          dest: process.env.PERSONAL_WEB_DEPLOY_DIR
        }
      }
    }
  });

  grunt.registerTask('deploy', 'Deploy app', [
    'rsync:app'
  ]);
};
