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
  },

  afterModel: function() {
    // Always scroll to top of window after route transition
    window.scrollTo(0, 0);
  }
});

App.Router.reopen({ 
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
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-23072816-1']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript';
  ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
App.Post = DS.Model.extend({
  slug:           DS.attr('string'),
  title:          DS.attr('string'),
  body:           DS.attr('string'),
  createdAt:      DS.attr('string'),
  updatedAt:      DS.attr('string'),
  publishedAt:    DS.attr('string')
});
App.ApplicationController = Ember.Controller.extend({
  setTitle: function(title, subtitle) {
    document.title = title;
    this.set('title', title);
    this.set('subtitle', subtitle);
  }
});
App.IndexController = Ember.Controller.extend({
  needs: ['application'],
});
App.PostController = Ember.Controller.extend({
  needs: ['application']
});
App.ApplicationRoute = Ember.Route.extend({
});
App.IndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('post').then(
      function(posts) {
        postsController = Ember.ArrayController.create({
          content: posts,
          sortProperties: ['publishedAt'],
          sortAscending: false
        });

        return postsController;
      }
    );
  },

  setupController: function(controller, model) {
    controller.set('model', model);
    controller.get('controllers.application').setTitle('Mark Hendrickson');
  }
});
App.PostRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('post', params.post_id);
  },

  setupController: function(controller, model) {
    if (!model.get('body')) {
      model.reload();
    }

    controller.set('model', model);
    controller.get('controllers.application').setTitle(
      model.get('title'), 
      new Date(model.get('publishedAt').replace(/-/g, "/")) // with Safari fix per http://stackoverflow.com/questions/4310953/invalid-date-in-safari
    );
  }
});
Ember.Handlebars.registerBoundHelper('markdown', function (content) {
  if (content) {
    return new Handlebars.SafeString(markdown.toHTML(content));
  }
});

Swag.registerHelpers(Ember.Handlebars);