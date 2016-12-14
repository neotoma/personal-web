require('../lib/env');

/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'web',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    intl: {
      baseLocale: 'en-us' // default build-time locale 
    },
    APP: {}
  };

  ENV.EmberENV.API_HOST = process.env.PERSONAL_WEB_API_HOST;
  ENV.EmberENV.GA_TRACKING_ID = process.env.PERSONAL_WEB_GA_TRACKING_ID;

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  return ENV;
};
