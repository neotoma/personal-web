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