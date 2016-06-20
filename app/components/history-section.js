import Ember from 'ember';
import ScrollToUpdateAppNavMixin from '../mixins/scroll-to-update-app-nav';

export default Ember.Component.extend(ScrollToUpdateAppNavMixin, {
  appNavOption: 'History',
  store: Ember.inject.service(),

  init() {
    this._super(...arguments);
    var self = this;

    this.get('store').findAll('attribute').then(function(attributes) {
      self.set('history', attributes.findBy('id', 'history').get('value'));
      self.set('birthday', attributes.findBy('id', 'birthday').get('value'));
      self.set('today', Date());
    });
  }
});
