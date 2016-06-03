import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  slug:           attr('string'),
  coverImageURL:  attr('string'),
  title:          attr('string'),
  body:           attr('string'),
  createdAt:      attr('string'),
  updatedAt:      attr('string'),
  publishedAt:    attr('string')
});