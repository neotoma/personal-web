import Ember from 'ember';

export default Ember.Component.extend({
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
      this.set('loaded', true);
    }).catch((error) => {
      this.handleError(error);
    });

    this.deferRendering(query);
  },

  empty: Ember.computed('companies.length', function() {
    return (this.get('companies.length') === 0);
  })
});
