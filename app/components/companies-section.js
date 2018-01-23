import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['id'],
  classNameBindings: ['carousel', 'limit:limited'],
  classNames: ['companies'],
  id: 'companies',
  sortedCompaniesProperties: ['startedAt:desc'],
  sortedCompanies: Ember.computed.sort('companies', 'sortedCompaniesProperties'),
  store: Ember.inject.service(),
  tagName: 'section',

  init() {
    this._super(...arguments);

    var query = this.get('store').findAll('company', {
      limit: this.get('limit'),
      sort: '-startedAt'
    }).then((companies) => {
      this.set('companies', companies);
    });

    this.deferRendering(query);
  }
});
