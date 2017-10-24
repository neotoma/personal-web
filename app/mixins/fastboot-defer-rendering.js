import Ember from 'ember';

export default Ember.Mixin.create({
  fastboot: Ember.inject.service(),

  /**
   * Defer rendering with FastBoot until promise has resolved
   * @param (Promise) promise
   */
  deferRendering: function(promise) {
    if (this.get('fastboot.isFastBoot')) {
      this.get('fastboot').deferRendering(promise);
    }
  }
});
