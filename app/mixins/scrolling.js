import Ember from 'ember';

export default Ember.Mixin.create({
  bindScrolling() {
    var onScrollDebounce = () => {
      Ember.run.debounce(this, function() {
        return this.onScroll();
      }, 50);
    };

    if (typeof document !== 'undefined' && Ember.$(document).bind) {
      Ember.$(document).bind('touchmove', onScrollDebounce);
    }

    if (Ember.$ && window && Ember.$(window).bind) {
      Ember.$(window).bind('scroll', onScrollDebounce);
    }
  }
});
