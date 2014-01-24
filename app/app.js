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