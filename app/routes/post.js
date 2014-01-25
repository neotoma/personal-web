App.PostRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('post', params.post_id);
  },

  setupController: function(controller, model) {
    if (!model.get('body')) {
      model.reload();
    }
    
    controller.set('model', model);
  }
});