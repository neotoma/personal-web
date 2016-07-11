import Ember from 'ember';

export default Ember.Mixin.create({
  transitionDelay: 500,
  componentEvents: Ember.inject.service(),
  appNav: Ember.inject.service(),

  activate: function() {
    var self = this;

    Ember.run.next(this, function() {
      Ember.$(window).scrollTop(self.getLastScroll());
      this.get('appNav').show();
    });
  },

  afterModel: function() {
    var self = this;

    Ember.run.later(this, function() {
      Ember.$(window).scrollTop(self.getLastScroll());
    }, 50);
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

      if (this.get('routeName') === 'application') {
        return true;
      }

      if (this.get('transitionDelayed')) {
        this.set('transitionDelayed', false);
        return true;
      } else {
        transition.abort();
        this.set('transitionDelayed', true);
        this.setLastScroll('lastScroll', Ember.$(window).scrollTop());

        this.get('componentEvents').hideAll();

        Ember.run.later(transition, function() {
          transition.retry();
        }, this.get('transitionDelay'));
      }
    }
  }
});