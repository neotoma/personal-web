import attr from 'ember-data/attr';
import Ember from 'ember';
import { hasMany } from 'ember-data/relationships';
import Model from 'ember-data/model';
import orientation from 'personal-web/utils/orientation';

export default Model.extend({
  createdAt: attr('date'),
  description: attr('string'),
  imageUrl: attr('string'),
  thumbImageUrl: attr('string'),
  largeImageUrl: attr('string'),
  height: attr('number'),
  orientation: orientation,
  posts: hasMany('post'),
  publishedAt: attr('date'),
  updatedAt: attr('date'),
  width: attr('number'),

  dimensions: Ember.computed('firstName', 'lastName', function() {
    if (this.get('width') && this.get('height')) {
      return this.get('width') + 'x' + this.get('height');
    }
  }),

  name: Ember.computed('description', function() {
    return this.get('description');
  })
});
