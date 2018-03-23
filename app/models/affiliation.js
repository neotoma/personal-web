import attr from 'ember-data/attr';
import Ember from 'ember';
import Model from 'ember-data/model';

export default Model.extend({
  description: attr('string'),
  endedAt: attr('date'),
  featured: attr('boolean'),
  imageUrl: attr('string'),
  imageType: 'logo',
  name: attr('string'),
  publishedAt: attr('date'),
  startedAt: attr('date'),
  url: attr('string')
});
