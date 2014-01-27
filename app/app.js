App = Ember.Application.create();

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

    return url;
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
  }
});