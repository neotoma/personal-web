import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['id'],
  classNames: ['links'],
  id: 'links',
  sortedLinksProperties: ['name:asc'],
  sortedLinks: Ember.computed.sort('links', 'sortedLinksProperties'),
  store: Ember.inject.service(),
  tagName: 'section',

  init() {
    this._super(...arguments);

    var query = this.get('store').findAll('link').then((links) => {
      this.set('links', links);
    });

    this.deferRendering(query);
  }
});
