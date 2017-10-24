import attr from 'ember-data/attr';
import Ember from 'ember';
import Model from 'ember-data/model';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  author: attr('string'),
  body: attr('string'),
  createdAt: attr('date'),
  excerpt: attr('string'),
  image: belongsTo('image'),
  photo: belongsTo('photo'),
  publishedAt: attr('date'),
  slug: attr('string'),
  title: attr('string'),
  updatedAt: attr('date'),
  updates: hasMany('update'),

  canonicalId: Ember.computed('id', 'slug', function() {
    return this.get('slug') ? this.get('slug') : this.get('id');
  }),

  imageUrl: Ember.computed('photo.imageUrl', 'image.assetUrl', function() {
    if (this.get('photo.imageUrl')) {
      return this.get('photo.imageUrl');
    } else if (this.get('image.assetUrl')) {
      return this.get('image.assetUrl');
    }
  })
});
