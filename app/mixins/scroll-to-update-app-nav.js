import Ember from 'ember';
import InViewportMixin from 'ember-in-viewport';

export default Ember.Mixin.create(InViewportMixin, {
  appNav: Ember.inject.service(),

  didEnterViewport() {
    this.get('appNav').set('activeOption', this.get('appNavOption'));
  },

  viewportOptionsOverride: Ember.on('didInsertElement', function() {
    Ember.setProperties(this, {
      viewportUseRAF            : true,
      viewportSpy               : true,
      viewportScrollSensitivity : 1,
      viewportRefreshRate       : 150,
      viewportTolerance: {
        top    : 50,
        bottom : 50,
        left   : 50,
        right  : 50
      }
    });
  })
});
