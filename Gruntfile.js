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
          exclude: [
            ".DS_Store",
            ".git*",
            "node_modules",
            "*.sublime*",
            "Gruntfile.js"
          ],
          src: './dist/*',
          dest: process.env.WEB_DEPLOY_HOST_DIR
        }
      }
    }
  });

  grunt.registerTask('deploy', [
    'rsync:app'
  ]);
};