import Ember from 'ember';
import ScrollingMixin from 'personal-web/mixins/scrolling';
import ComponentTransitionsMixin from 'personal-web/mixins/component-transitions';

export default Ember.Component.extend(ScrollingMixin, ComponentTransitionsMixin, Ember.Evented, {
  appNav: Ember.inject.service(),
  classNameBindings: ['scrolled', 'shown'],
  classNames: ['app'],
  computedAttributes: ['fullName', 'imageUrl', 'url'],
  hidden: true,
  store: Ember.inject.service(),
  tagName: 'nav',

  init() {
    this._super(...arguments);

    this.get('appNav').on('show', () => {
      this.set('hidden', false);
    });
  },

  options: function() {
    return this.get('appNav.options');
  }.property('appNav.options'),

  activeOption: function() {
    return this.get('appNav.activeOption');
  }.property('appNav.activeOption'),

  onScroll() {
    if (Ember.$ && typeof document !== 'undefined') {
      this.set('scrolled', (Ember.$(document).scrollTop() > 0));
    }
  },

  didInsertElement() {
    this.bindScrolling();
  }
});
