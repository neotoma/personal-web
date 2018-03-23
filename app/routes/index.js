import Ember from 'ember';

export default Ember.Route.extend({
  appNavHidden: true,
  headData: Ember.inject.service(),

  model() {
    return this.get('store').findAll('attribute').catch((error) => {
      Ember.Logger.error('attribute records not found for index route', error);
    });
  },

  setupController(controller, attributes) {
    if (attributes) {
      attributes.forEach((attribute) => {
        this.get('headData').set(attribute.get('id'), attribute.get('value'));
      });
    }

    this.set('headData.title', this.get('headData.fullName'));
    this.set('headData.type', 'profile');
  }
});
