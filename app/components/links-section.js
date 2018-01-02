import Ember from 'ember';

export default Ember.Component.extend({
  appNavOption: 'Links',
  attributeBindings: ['id'],
  classNames: ['links'],
  fastboot: Ember.inject.service(),
  id: 'links',
  links: [],
  sortedLinksProperties: ['name:asc'],
  sortedLinks: Ember.computed.sort('links', 'sortedLinksProperties'),
  store: Ember.inject.service(),
  tagName: 'section',

  init() {
    this._super(...arguments);

    var query = this.get('store').findAll('link').then((links) => {
      this.set('links', links);
      this.set('loaded', true);
    }).catch((error) => {
      this.handleError(error);
    });

    this.deferRendering(query);
  },

  empty: Ember.computed('links.length', function() {
    return (this.get('links.length') === 0);
  })
});
