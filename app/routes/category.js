import Ember from 'ember';

export default Ember.Route.extend({
  headData: Ember.inject.service(),

  model(params) {
    return this.store.findRecord('category', params.category_id, { include: 'posts' });
  },

  setupController(controller, category) {
    controller.set('category', category);

    this.set('headData.title', category.get('name'));
    this.set('headData.type', 'category');
  },

  actions: {
    error(error) {
      if (error) {
        this.intermediateTransitionTo('not-found', error);
      }
    }
  }
});
