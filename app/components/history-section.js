import Ember from 'ember';
import ScrollToUpdateAppNavMixin from 'personal-web/mixins/scroll-to-update-app-nav';
import ComponentTransitionsMixin from 'personal-web/mixins/component-transitions';

export default Ember.Component.extend(ScrollToUpdateAppNavMixin, ComponentTransitionsMixin, {
  appNavOption: 'History',
  attributeBindings: ['id'],
  classNames: ['history'],
  computedAttributes: ['birthday', 'history', 'url'],
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
  })
});
