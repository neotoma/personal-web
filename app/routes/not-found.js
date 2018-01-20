import Ember from 'ember';

export default Ember.Route.extend({
  headData: Ember.inject.service(),

  model() {
    return this.store.findAll('redirect');
  },

  afterModel(model) {
    model.forEach((redirect) => {
      if (this.get('router.url') === redirect.get('legacyPath')) {
        this.replaceWith(redirect.get('resourceModel'), redirect.get('resourceId'));
      }
    });
  },

  setupController() {
    this.set('headData.title', 'Not Found');
  }
});
