import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  name: attr('string'),
  tagline: attr('string'),
  logoUrl: attr('string'),
  startedAt: attr('date'),
  url: attr('string')
});
