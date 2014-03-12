App = Ember.Application.create(APP_CONFIG);

App.Router.map(function() {
  this.route('index', { path: '/' });
  this.resource('post', { path: '/post/:post_id' });
});

var ApplicationAdapterNameSpace = 'data';

// GitHub Pages hosts places app under a directory so it needs a different namespace
if (location.hostname == 'markmhx.github.io') {
  ApplicationAdapterNameSpace = 'markmhendrickson/data'
}

App.ApplicationAdapter = DS.RESTAdapter.extend({
  namespace: ApplicationAdapterNameSpace,

  // Modify buildURL to support querying of collections from file
  buildURL: function(type, id) {
    var url = this._super(type, id);

    if (!id) {
      url = url + '-all';
    }

    return '/static' + url;
  }
});

// Reopen route to add class name that indicates current route to body tag
Ember.Route.reopen({
  activate: function() {
    this._super();

    var cssClass = this.toCssClass();
    
    if (cssClass != 'application') {
      Ember.$('body').addClass(cssClass);
    }
  },

  deactivate: function() {
    Ember.$('body').removeClass(this.toCssClass());
  },

  toCssClass: function() {
    return this.routeName.replace(/\./g, '-').dasherize();
  },

  afterModel: function() {
    // Always scroll to top of window after route transition
    window.scrollTo(0, 0);
  }
});

App.Router.reopen({ 
  location: 'history',
  
  didTransition: function(params) {
    this._super(params);

    // Google Analytics pageview tracking
    if (window._gaq !== undefined) { 
      Ember.run.next(function(){
        _gaq.push(['_trackPageview', window.location.hash.substr(1)]);
      });
    }
  }
});