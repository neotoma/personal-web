import Ember from 'ember';
import { pluralize } from 'ember-inflector';

let pluralModelName = Ember.computed('modelName', function() {
  return this.get('modelName') ? pluralize(this.get('modelName')) : undefined;
});

export default Ember.Component.extend({
  attributeBindings: ['id'],
  classNameBindings: [
    'carousel',
    'limit:limited',
    'pluralModelName',
    'listings.length:hasListings:hasNoListings',
    'hideNoListings:hideNoListings'
  ],
  classNames: 'listings',
  id: pluralModelName,
  layoutName: 'components/listings-section',
  listingLi: 'listing-li',
  pluralModelName: pluralModelName,
  store: Ember.inject.service(),
  tagName: 'section',

  actions: {
    error(error) {
      Ember.Logger.debug(error.message);
    }
  },

  header: Ember.computed('modelName', function() {
    return this.get('modelName') ? pluralize(this.get('modelName').charAt(0).toUpperCase() + this.get('modelName').slice(1)) : undefined;
  }),

  init() {
    this._super(...arguments);

    if (!this.get('listings')) {
      this.findAll(this.get('modelName'), {
        limit: this.get('limit'),
        sort: this.get('sort') ? this.get('sort') : '-publishedAt,-createdAt,-id'
      }).then((listings) => {
        this.set('listings', listings);
      }).catch(() => {
        Ember.Logger.log(`${this.get('modelName')} listings-section initialized empty`);
      });
    }
  },

  showViewAll: Ember.computed('limit', 'hideViewAll', function() {
    return (this.get('limit') && !this.get('hideViewAll'));
  })
});
