import attr from 'ember-data/attr';
import Model from 'ember-data/model';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  coverPhoto: belongsTo('photo'),
  description: attr('string'),
  photos: hasMany('photo'),
  publishedAt: attr('date'),
  title: attr('string')
});
