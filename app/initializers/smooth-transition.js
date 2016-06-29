import Ember from 'ember';
import SmoothTransitionMixin from '../mixins/smooth-transition';

export function initialize(/* application */) {
  Ember.Route.reopen(SmoothTransitionMixin);

  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
}

export default {
  name: 'smooth-transition',
  initialize
};