import attr from 'ember-data/attr';
import Ember from 'ember';
import Model from 'ember-data/model';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  author: attr('string'),
  body: attr('string'),
  createdAt: attr('date'),
  excerpt: attr('string'),
  image: belongsTo('image'),
  photo: belongsTo('photo'),
  publishedAt: attr('date'),
  title: attr('string'),
  updatedAt: attr('date'),

  imageType: Ember.computed('photo.type', 'image.type', function() {
    if (this.get('photo.type')) {
      return this.get('photo.type');
    } else if (this.get('image.type')) {
      return this.get('image.type');
    }
  }),

  imageUrl: Ember.computed('photo.imageUrl', 'image.assetUrl', function() {
    if (this.get('photo.imageUrl')) {
      return this.get('photo.imageUrl');
    } else if (this.get('image.assetUrl')) {
      return this.get('image.assetUrl');
    }
  }),

  imageOrientation: Ember.computed('photo.orientation', 'image.orientation', function() {
    if (this.get('photo.orientation')) {
      return this.get('photo.orientation');
    } else if (this.get('image.orientation')) {
      return this.get('image.orientation');
    }
  })
});
