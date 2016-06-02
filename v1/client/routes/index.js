App.IndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('post').then(
      function(posts) {
        postsController = Ember.Controller.create({
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
  }
});