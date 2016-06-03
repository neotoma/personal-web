import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    this.store.findAll('post').then(
      (posts) => {
        return Ember.Controller.create({
          content: posts,
          sortProperties: ['publishedAt'],
          sortAscending: false
        });
      },
      (error) => console.error(error)
    );
  },

  setupController(controller, model) {
    controller.set('model', model);
  }
});
