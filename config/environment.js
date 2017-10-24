require('../lib/env');

/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    APP: {},
    rootUrl: '/',
    EmberENV: {
      FEATURES: {}
    },
    environment: environment,
    intl: {
      baseLocale: 'en-us'
    },
    locationType: 'auto',
    modulePrefix: 'personal-web',
    segment: {
      defaultPageTrack: false,
      WRITE_KEY: process.env.PERSONAL_WEB_SEGMENT_WRITE_KEY
    }
  };

  ENV.EmberENV.API_HOST = process.env.PERSONAL_WEB_API_HOST;

  if (environment === 'test') {
    ENV.rootUrl = '/';
    ENV.locationType = 'none';
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;
    ENV.APP.rootElement = '#ember-testing';
  }

  return ENV;
};
