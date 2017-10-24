import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('redirect');
  },

  afterModel(model) {
    if (!window || !window.location) { return; }

    model.forEach((redirect) => {
      if (window.location.pathname === redirect.get('legacyPath')) {
        this.replaceWith(redirect.get('resourceModel'), redirect.get('resourceId'));
      }
    });
  },

  setupController: function(controller) {
    Ember.run.next(() => {
      if (!this.get('isDestroyed')) {
        controller.set('loadedClass', 'loaded');
      }
    });
  }
});
