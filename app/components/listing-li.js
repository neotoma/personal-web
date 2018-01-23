import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['format', 'hasContent:hasContent:hasNoContent', 'hasImage:hasImage:hasNoImage', 'hasHeader:hasHeader:hasNoHeader'],
  tagName: 'li',

  date: Ember.computed('listing.createdAt', 'listing.publishedAt', function() {
    if (this.get('listing.publishedAt')) {
      return this.get('listing.publishedAt');
    } else if (this.get('listing.createdAt')) {
      return this.get('listing.createdAt');
    }
  }),

  hasContent: Ember.computed('hasHeader', 'hasDate', function() {
    return (this.get('hasHeader') && this.get('hasDate'));
  }),

  hasDate: Ember.computed('date', function() {
    return (this.get('date'));
  }),

  hasImage: Ember.computed('listing.imageUrl', function() {
    return (this.get('listing.imageUrl'));
  }),

  hasHeader: Ember.computed('header', function() {
    return (this.get('header'));
  }),

  header: Ember.computed('listing.name', 'listing.title', function() {
    if (this.get('listing.name')) {
      return this.get('listing.name');
    } else if (this.get('listing.title')) {
      return this.get('listing.title');
    }
  })
});
