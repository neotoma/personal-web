import Ember from 'ember';
import ScrollingMixin from '../mixins/scrolling';

export default Ember.Component.extend(ScrollingMixin, {
  tagName: 'nav',
  classNames: ['app'],
  classNameBindings: ['shown', 'scrolled'],
  appNav: Ember.inject.service(),
  store: Ember.inject.service(),

  init: function() {
    this._super(...arguments);

    var self = this;
    this.get('store').findAll('attribute').then(function(attributes) {
      self.set('fullName', attributes.findBy('id', 'fullName').get('value'));
      self.set('shown', true);
    });
  },

  options: function() {
    return this.get('appNav.options');
  }.property('appNav.options'),

  activeOption: function() {
    return this.get('appNav.activeOption');
  }.property('appNav.activeOption'),

  onScroll() {
    this.set('scrolled', ($(document).scrollTop() > 0));
  },

  didInsertElement() {
    this.bindScrolling();
  }
});