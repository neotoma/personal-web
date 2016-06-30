import Ember from 'ember';

export function initialize(/* application */) {
  Ember.Router.reopen({
    headData: Ember.inject.service(),

    setTitle(title) {
      this.get('headData').set('title', title);
    }
  });
}

export default {
  name: 'set-title',
  initialize
};
