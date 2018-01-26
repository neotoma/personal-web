require('park-ranger')();

/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    APP: {},
    rootUrl: '/',
    EmberENV: {
      FEATURES: {}
    },
    environment: environment,
    fastboot: {
      hostWhitelist: [/^127\.0\.0\.1:\d+$/, /^localhost:\d+$/, process.env.HOIST_DEST_HOST]
    },
    historySupportMiddleware: true,
    intl: {
      baseLocale: 'en-us'
    },
    locationType: 'router-scroll',
    modulePrefix: 'personal-web',
    segment: {
      defaultPageTrack: false,
      WRITE_KEY: process.env.PERSONAL_WEB_SEGMENT_WRITE_KEY
    }
  };

  ENV.EmberENV.API_HOST = process.env.PERSONAL_WEB_API_HOST ? process.env.PERSONAL_WEB_API_HOST : 'http://127.0.0.1:9100';

  if (environment === 'test') {
    ENV.rootUrl = '/';
    ENV.locationType = 'none';
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;
    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment == 'production') {
    ENV.EmberENV.API_HOST = process.env.PERSONAL_WEB_PRODUCTION_API_HOST;
    ENV.segment.WRITE_KEY = process.env.PERSONAL_WEB_PRODUCTION_SEGMENT_WRITE_KEY;
  }

  return ENV;
};
