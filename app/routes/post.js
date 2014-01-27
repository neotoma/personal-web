App.PostRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('post', params.post_id);
  },

  setupController: function(controller, model) {
    if (!model.get('body')) {
      model.reload();
    }

    document.title = model.get('title');
    
    controller.set('model', model);
    controller.set('title', model.title);
  }
});