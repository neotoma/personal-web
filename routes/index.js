App.IndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('post').then(function(posts) {
      return posts
    });
  }
});