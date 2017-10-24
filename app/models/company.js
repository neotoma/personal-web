import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  name: attr('string'),
  tagline: attr('string'),
  logoUrl: attr('string'),
  positions: hasMany('position'),
  startedAt: attr('date'),
  url: attr('string')
});
