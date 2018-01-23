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

  imageFrame: Ember.computed('photo.frame', 'image.frame', function() {
    if (this.get('photo.frame')) {
      return this.get('photo.frame');
    } else if (this.get('image.frame')) {
      return this.get('image.frame');
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
