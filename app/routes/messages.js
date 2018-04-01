import Ember from 'ember';

export default Ember.Route.extend({
  headData: Ember.inject.service(),

  setupController() {
    this.set('headData.title', 'Contact');
  }
});
