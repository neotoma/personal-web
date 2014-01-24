App.PostRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('post', params.post_id);
  },

  setupController: function(controller, model) {
    model.reload();
    controller.set('model', model);
  }
});