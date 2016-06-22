import Ember from 'ember';
import ScrollToUpdateAppNavMixin from '../mixins/scroll-to-update-app-nav';

export default Ember.Component.extend(ScrollToUpdateAppNavMixin, {
  appNavOption: 'Companies',
  tagName: 'section',
  classNames: ['companies'],
  classNameBindings: ['shown'],
  attributeBindings: ['id'],
  id: 'companies',
  store: Ember.inject.service(),

  init() {
    this._super(...arguments);
    var self = this;

    this.get('store').findAll('company').then(function(companies) {
      self.set('companies', companies);
      self.set('shown', true);
    });
  }
});
