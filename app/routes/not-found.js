import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('redirect');
  },

  afterModel(model, transition) {
    var self = this;

    model.forEach(function(redirect) {
      if (window.location.pathname === redirect.get('legacyPath')) {
        self.replaceWith(redirect.get('resourceModel'), redirect.get('resourceId'));
      }
    });
  },

  setupController: function(controller, model) {
    Ember.run.next(function() {
      controller.set('loadedClass', 'loaded');
    });
  }
});