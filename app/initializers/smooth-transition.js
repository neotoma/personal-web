import Ember from 'ember';
import SmoothTransitionMixin from 'personal-web/mixins/smooth-transition';

export function initialize(/* application */) {
  if (Ember.$ && window && window.history) {
    Ember.Route.reopen(SmoothTransitionMixin);

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }
}

export default {
  name: 'smooth-transition',
  initialize
};
