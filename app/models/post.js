import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import Ember from 'ember';
import Model from 'ember-data/model';

export default Model.extend({
  author: attr('string'),
  body: attr('string'),
  categories: hasMany('category'),
  createdAt: attr('date'),
  description: attr('string'),
  excerpt: attr('string'),
  image: belongsTo('image'),
  longDescription: attr('string'),
  photo: belongsTo('photo'),
  publication: attr('string'),
  publishedAt: attr('date'),
  subtitle: attr('string'),
  title: attr('string'),
  updatedAt: attr('date'),
  url: attr('string'),

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
