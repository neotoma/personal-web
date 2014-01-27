App.IndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('post').then(function(posts) {
      return posts
    });
  },

  setupController: function(controller, model) {
    controller.set('model', model);
    controller.get('controllers.application').setTitle('Mark Hendrickson');
  }
});