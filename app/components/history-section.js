import Ember from 'ember';
import ScrollToUpdateAppNavMixin from '../mixins/scroll-to-update-app-nav';
import ComponentTransitionsMixin from '../mixins/component-transitions';

export default Ember.Component.extend(ScrollToUpdateAppNavMixin, ComponentTransitionsMixin, {
  appNavOption: 'History',
  tagName: 'section',
  classNames: ['history'],
  attributeBindings: ['id'],
  id: 'history',
  store: Ember.inject.service(),

  init() {
    this._super(...arguments);
    var self = this;

    this.get('store').findAll('attribute').then(function(attributes) {
      self.set('history', attributes.findBy('id', 'history').get('value'));
      self.set('birthday', attributes.findBy('id', 'birthday').get('value'));
      self.set('today', Date());
      
      Ember.run.next(function() {
        self.set('loaded', true);
      });
    });
  },

  hasDates: Ember.computed('birthday', 'today', function() {
    return (this.get('birthday') && this.get('today'));
  })
});
