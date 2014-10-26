App.PostRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('post', params.post_id);
  },

  setupController: function(controller, model) {
    if (!model.get('body')) {
      model.reload();
    }

    controller.set('model', model);

    /** 
      Date replace regex below includes Safari fix
     
      http://stackoverflow.com/questions/4310953/invalid-date-in-safari
    **/
    controller.get('controllers.application').setTitle(
      model.get('title'),
      new Date(model.get('publishedAt').replace(/-/g, "/"))
    );
  }
});