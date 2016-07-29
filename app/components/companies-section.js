import Ember from 'ember';
import ScrollToUpdateAppNavMixin from '../mixins/scroll-to-update-app-nav';
import ComponentTransitionsMixin from '../mixins/component-transitions';

export default Ember.Component.extend(ScrollToUpdateAppNavMixin, ComponentTransitionsMixin, {
  appNavOption: 'Companies',
  tagName: 'section',
  classNames: ['companies'],
  attributeBindings: ['id'],
  id: 'companies',
  store: Ember.inject.service(),

  init() {
    this._super(...arguments);
    var self = this;

    this.get('store').findAll('company').then(function(companies) {
      self.set('companies', companies);
      
      Ember.run.next(function() {
        self.set('loaded', true);
      });
    });
  }
});
