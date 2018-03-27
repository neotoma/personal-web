import attr from 'ember-data/attr';
import Model from 'ember-data/model';

export default Model.extend({
  description: attr('string'),
  endedAt: attr('date'),
  featured: attr('string'),
  imageUrl: attr('string'),
  imageType: 'logo',
  longDescription: attr('string'),
  name: attr('string'),
  publishedAt: attr('date'),
  shortName: attr('string'),
  startedAt: attr('date'),
  url: attr('string')
});
