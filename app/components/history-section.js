import Ember from 'ember';
import ScrollToUpdateAppNavMixin from '../mixins/scroll-to-update-app-nav';

export default Ember.Component.extend(ScrollToUpdateAppNavMixin, {
  appNavOption: 'History',
  tagName: 'section',
  classNames: ['history'],
  classNameBindings: ['shown'],
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
        self.set('shown', true);
      });
    });
  },

  hasDates: Ember.computed('birthday', 'today', function() {
    return (this.get('birthday') && this.get('today'));
  })
});
