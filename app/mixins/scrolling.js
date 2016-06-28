import Ember from 'ember';

export default Ember.Mixin.create({
  bindScrolling() {
    var self = this;

    var onScroll = function() {
      return this.onScroll();
    };

    var onScrollDebounce = function() {
      Ember.run.debounce(self, onScroll, 50);
    };

    $(document).bind('touchmove', onScrollDebounce);
    $(window).bind('scroll', onScrollDebounce);
  }
});
