import Ember from 'ember';

function getUncachedScript(url, options) {
  options = Ember.$.extend(options || {}, {
    dataType: 'script',
    cache: true, // true to append "_={timestamp}", false - not to append
                // when used in combination with HTML5 Application Cache
                // false is handy
    url: url
  });
  return Ember.$.ajax(options);
}

var TrackingService = Ember.Service.extend({
  log: console, // can use a logging service instead
  config: {   // Google Analytics params. See Analytics.js docs for more options
    'Google Analytics': {
      'trackingId': window.EmberENV.GA_TRACKING_ID
    }
  },
  router: Ember.inject.service('router'), // router service

  /**
  * a queue for events happening before analytics.js is loaded
  */
  queue: [],

  /**
  * whether page view was tracked before analytics.js is loaded
  */
  pageviewBeforeReady: false,

  /**
  * whether analytics.js is ready
  */
  ready: false,

  /**
  * analytics.js instance
  */
  ax: null,

  prepare(libUrl) {
    const log = this.get('log');

    // don't return or store promise so that it's not possible
    // to block routing
    new Ember.RSVP.Promise((resolve, reject) => {
      log.info(`Loading a lib async: ${libUrl}`);
      getUncachedScript(libUrl).done(resolve).fail(reject);
    }).then(() => {
      // analytics is global and available at this point
      let ax = analytics.initialize(this.get('config'));
      this.set('ax', ax);

      // set ready once loaded
      this.set('ready', true);
      log.info('Tracking service: initialized');
    })
    .catch(function(err) {
      log.error('Tracking service: failed to load analytics.js', err);
    });
  },

  /**
  * Normal events are queued
  */
  track: function(eventName, params) {
    var events = [];
    if (!this.get('ready')) {
      this.get('queue').push(this._getEvent(eventName, params));
    } else {
      let event = this._getEvent(eventName, params);
      events = this.get('queue').concat([event]);
      this.set('queue', []); // clear queue
    }

    this._trackEvents(events);
  },

  trackPageView() {
    this.get('log').info('Tracking service: pageview');
    this.get('ax').page(); // analytics.js handles everything
  },

  /**
  * On init subscribe to the `currentPathDidChange` events
  */
  init(...args) {
    this._super(...args);
    this.get('router').on('currentPathDidChange',
      path => this.onPathChange(path));
  },

  /**
  * Page view events are not queued.
  * But if ax is ready before another transition
  * it still tracks the page view based on whether
  * `pageviewBeforeReady` happened
  */
  onPathChange(path) {
   if (!this.get('ready')) {
     this.set('pageviewBeforeReady', true);
   } else {
     this.set('pageviewBeforeReady', false);
     this.trackPageView();
   }
 },

  /**
  * when ready is true, apply all events from the queue and the missed page view
  */
  _onReady: Ember.observer('ready', function() {
    if (this.get('ready')) {
      this._trackEvents(this.get('queue'));
      if (this.get('pageviewBeforeReady')) {
        this.trackPageView();
      }
    }
  }),

  _trackEvents(events) {
    events.forEach(e => this.get('ax').track(e.eventName, e.params));
  },

  _getEvent(eventName, params) {
    const log = this.get('log');
    const supported = this.get('supportedEvents');
    const attrs = supported[eventName];

    log.info('Tracking service: sending ' + eventName, params);
    for (let i = 0; i < attrs.length; i++) {
      let attr = attrs[i];
      if (!(attr in params)) {
        log.warn(`Tracking service: event ${eventName}
          does not have a param called ${attr}`);
      }
    }
    return {eventName: eventName, params: params};
  }
});

export default TrackingService;