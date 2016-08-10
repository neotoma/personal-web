import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  slug:           attr('string'),
  title:          attr('string'),
  excerpt:        attr('string'),
  body:           attr('string'),
  author:         attr('string'),
  createdAt:      attr('date'),
  updatedAt:      attr('date'),
  publishedAt:    attr('date'),
  photo:          belongsTo('photo'),
  image:          belongsTo('image'),
  updates:        hasMany('update'),

  canonicalId: function() {
    return this.get('slug') ? this.get('slug') : this.get('id');
  }.property('id', 'slug'),

  imageUrl: Ember.computed('photo.imageUrl', 'image.assetUrl', function() {
    if (this.get('photo.imageUrl')) {
      return this.get('photo.imageUrl');
    } else if (this.get('image.assetUrl')) {
      return this.get('image.assetUrl');
    } else {
      return null;
    }
  })
});