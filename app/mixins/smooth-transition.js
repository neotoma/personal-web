import Ember from 'ember';

export default Ember.Mixin.create({
  transitionDelay: 500,
  appNav: Ember.inject.service(),

  activate: function() {
    this._super.apply(this, arguments);
    var self = this;

    Ember.run.next(this, function() {
      Ember.$(window).scrollTop(self.getLastScroll());
      this.get('appNav').set('shown', true);
    });
  },

  getLastScroll: function() {
    if (this.get('id')) {
      let lastScrollValues = this.get('lastScrollValues') ? this.get('lastScrollValues') : {};
      return lastScrollValues[this.get('id')] ? lastScrollValues[this.get('id')] : 0;
    } else {
      return this.get('lastScroll') ? this.get('lastScroll') : 0;
    }
  },

  setLastScroll: function() {
    if (this.get('id')) {
      let lastScrollValues = this.get('lastScrollValues') ? this.get('lastScrollValues') : {};
      lastScrollValues[this.get('id')] = Ember.$(window).scrollTop();
      this.set('lastScrollValues', lastScrollValues);
    } else {
      this.set('lastScroll', Ember.$(window).scrollTop());
    }
  },

  actions: {
    willTransition: function(transition) {
      this._super.apply(this, arguments);
      var self = this;

      if (this.get('routeName') == 'application') {
        return true;
      }

      if (this.get('transitionDelayed')) {
        this.set('transitionDelayed', false);
        return true;
      } else {
        transition.abort();
        this.set('transitionDelayed', true);
        this.setLastScroll('lastScroll', Ember.$(window).scrollTop());
        
        $('section.shown').removeClass('shown');
        this.get('appNav').set('shown', false);

        Ember.run.later(transition, function() {
          transition.retry();
        }, this.get('transitionDelay'));
      }
    }
  }
});