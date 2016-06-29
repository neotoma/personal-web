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
      
      Ember.run.next(function() {
        self.get('appNav').set('shown', true);
      });
    });
  },

  shown: function() {
    return this.get('appNav.shown');
  }.property('appNav.shown'),

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