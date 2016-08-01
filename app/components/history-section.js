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
      var history = attributes.findBy('id', 'history');
      var birthday = attributes.findBy('id', 'birthday');

      if (history && history.get('value')) {
        self.set('history', history.get('value'));
      } else {
        self.handleError(new Error('No history property available'));
      }

      if (birthday) {
        self.set('birthday', birthday.get('value'));
      }

      self.set('today', Date());
      
      Ember.run.next(function() {
        self.set('loaded', true);
      });
    }).catch(function(error) {
      self.handleError(error);
    });
  },

  hasDates: Ember.computed('birthday', 'today', function() {
    return (this.get('birthday') && this.get('today'));
  })
});
