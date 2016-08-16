import Ember from 'ember';

const {computed} = Ember;
const {alias} = computed;

// Events to trigger/catch events
const RouterService = Ember.Service.extend(Ember.Evented,
{
  /*
  * Inject Ember's private routing service
  */
  routing: Ember.inject.service('-routing'),

  /**
  * Reference to an EmberRouter
  */
  router: alias('routing.router'),

  /**
  * Use EmberRouter to watch transitions
  */
  init: function(...args) {
    this._super(...args);
    const router = this.get('router');
    router.on('willTransition', (transition) =>
      this.trigger('currentPathWillChange', transition));
    router.on('didTransition', () =>
      this.trigger('currentPathDidChange', router.get('url')));
  },

  /**
  * API we expose
  * and events
  * + currentPathDidChange(currentPath)
  * + currentPathWillChange(transition)
  */
  transitionTo(...args) {
    return this.get('routing').transitionTo(...args);
  }

  /**
  * Other methods
  */

});

export default RouterService;