import Ember from 'ember';

export default Ember.Component.extend({
  appNavOption: 'History',
  attributeBindings: ['id'],
  classNameBindings: ['expanded'],
  classNames: ['history'],
  computedAttributes: ['birthday', 'history', 'url'],
  expanded: false,
  id: 'history',
  store: Ember.inject.service(),
  tagName: 'section',
  today: Date(),

  init() {
    this._super(...arguments);
    this.set('loaded', true);
  },

  hasDates: Ember.computed('birthday', 'today', function() {
    return (this.get('birthday') && this.get('today'));
  }),

  loaded: Ember.computed('attributes', function() {
    return (this.get('attributes.length'));
  }),

  actions: {
    expand() {
      this.set('expanded', true);
    }
  }
});
