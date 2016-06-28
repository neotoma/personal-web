import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'section',
  classNames: ['post'],
  classNameBindings: ['shown'],
  store: Ember.inject.service(),

  didInsertElement() {
    var self = this;

    setTimeout(function() {
      self.set('shown', true);
    }, 0);
  }
});