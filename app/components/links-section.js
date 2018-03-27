import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['id'],
  classNameBindings: ['links.length:notEmpty:empty'],
  classNames: ['links'],
  id: 'links',
  sortedLinksProperties: ['name:asc'],
  sortedLinks: Ember.computed.sort('links', 'sortedLinksProperties'),
  store: Ember.inject.service(),
  tagName: 'section',

  init() {
    this._super(...arguments);

    this.findAll('link').then((links) => {
      this.set('links', links);
    }).catch(() => {
      Ember.Logger.log('links-section initialized empty');
    });;
  }
});
