App.IndexRoute = Ember.Route.extend({
  title: 'Mark Hendrickson',
  model: function() {
    return this.store.find('post').then(function(posts) {
      return posts
    });
  },

  setupController: function(controller, model) {
    controller.set('model', model);
    document.title = 'Mark Hendrickson';
  }
});