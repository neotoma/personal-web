import Ember from 'ember';
import InViewportMixin from 'ember-in-viewport';

export default Ember.Mixin.create(InViewportMixin, {
  appNav: Ember.inject.service(),

  didEnterViewport() {
    this.set('appNav.activeOption', this.get('appNavOption'));
  },

  didExitViewport() {
    if (this.get('appNav.activeOption') === this.get('appNavOption')) {
      this.set('appNav.activeOption', null);
    }
  },

  viewportOptionsOverride: Ember.on('didInsertElement', function() {
    Ember.setProperties(this, {
      viewportSpy: true,
      viewportTolerance: {
        top    : 50,
        bottom : 0,
        left   : 50,
        right  : 50
      }
    });
  })
});
