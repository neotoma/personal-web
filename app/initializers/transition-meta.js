import Ember from 'ember';

export function initialize() {
  Ember.Router.reopen({
    headData: Ember.inject.service(),

    willTransition() {
      this._super.apply(this, arguments);
      this.get('headData').clearData();
    }
  });
}

export default {
  name: 'transition-meta',
  initialize
};
