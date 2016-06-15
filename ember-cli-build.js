/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var pickFiles = require('broccoli-static-compiler');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    modernizr: {
      shouldParseFiles: false
    }
  });

  // PhotoSwipe
  app.import('bower_components/photoswipe/dist/photoswipe.css');
  app.import('bower_components/photoswipe/dist/default-skin/default-skin.css');
  app.import('bower_components/photoswipe/dist/default-skin/default-skin.svg');
  app.import('bower_components/photoswipe/dist/photoswipe.js');
  app.import('bower_components/photoswipe/dist/photoswipe-ui-default.js');

  var photoswipeImages = pickFiles('bower_components/photoswipe/dist/default-skin', {
    srcDir: '/',
    files: ['**/*.png', '**/*.svg', '**/*.gif'],
    destDir: '/assets'
  });

  return app.toTree([photoswipeImages]);
};