import Ember from 'ember';

export default Ember.Mixin.create({
  date: Ember.computed('listing.createdAt', 'listing.publishedAt', function() {
    if (this.get('listing.publishedAt')) {
      return this.get('listing.publishedAt');
    } else if (this.get('listing.createdAt')) {
      return this.get('listing.createdAt');
    }
  }),

  hasBody: Ember.computed('listing.body', function() {
    return (this.get('listing.body'));
  }),

  hasContent: Ember.computed('hasBody', 'hasDescription', 'hasDate', 'hasHeader', function() {
    return ((this.get('hasDate') || this.get('hasDescription')) && (this.get('hasBody') || this.get('hasHeader')));
  }),

  hasDate: Ember.computed('date', function() {
    return (this.get('date'));
  }),

  hasDescription: Ember.computed('listing.description', function() {
    return (this.get('listing.description'));
  }),

  hasImage: Ember.computed('imageUrl', function() {
    return (this.get('imageUrl'));
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
  }),

  imageUrl: Ember.computed('listing.imageUrl', 'listing.thumbImageUrl', function() {
    if (this.get('listing.thumbImageUrl')) {
      return this.get('listing.thumbImageUrl');
    } else if (this.get('listing.imageUrl')) {
      return this.get('listing.imageUrl');
    }
  }),

  linkDescription: Ember.computed('hasHeader', 'linkListings', function() {
    return (!this.get('hasHeader') && this.get('linkListings'));
  }),

  linkListing: Ember.computed('hasContent', 'hasHeader', 'linkListings', function() {
    return ((this.get('hasHeader') || !this.get('hasContent')) && this.get('linkListings'));
  })
});
