import Ember from 'ember';
import ScrollToUpdateAppNavMixin from '../mixins/scroll-to-update-app-nav';
import ComponentTransitionsMixin from '../mixins/component-transitions';

export default Ember.Component.extend(ScrollToUpdateAppNavMixin, ComponentTransitionsMixin, {
  appNavOption: 'Companies',
  tagName: 'section',
  classNames: ['companies'],
  companies: [],
  attributeBindings: ['id'],
  id: 'companies',
  store: Ember.inject.service(),
  sortedCompaniesProperties: ['startedAt:desc'],
  sortedCompanies: Ember.computed.sort('companies', 'sortedCompaniesProperties'),

  init() {
    this._super(...arguments);

    var query = this.get('store').findAll('company').then((companies) => {
      this.set('companies', companies);

      Ember.run.next(() => {
        this.set('loaded', true);
      });
    }).catch((error) => {
      this.handleError(error);
    });

    this.deferRendering(query);
  },

  empty: Ember.computed('companies.length', function() {
    return (this.get('companies.length') === 0);
  })
});
