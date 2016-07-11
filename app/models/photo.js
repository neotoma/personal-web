import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  description:    attr('string'),
  imageUrl:       attr('string'),
  width:          attr('number'),
  height:         attr('number'),
  createdAt:      attr('date'),
  updatedAt:      attr('date'),
  publishedAt:    attr('date'),
  posts:          hasMany('post'),

  dimensions: Ember.computed('firstName', 'lastName', function() {
    if (this.get('width') && this.get('height')) {
      return this.get('width') + 'x' + this.get('height');
    }
  })
});