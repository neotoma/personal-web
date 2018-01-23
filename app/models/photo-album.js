import attr from 'ember-data/attr';
import Model from 'ember-data/model';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  description: attr('string'),
  photos: hasMany('photo'),
  publishedAt: attr('date'),
  title: attr('string')
});
