import attr from 'ember-data/attr';
import Model from 'ember-data/model';

export default Model.extend({
  description: attr('string'),
  name: attr('string'),
  shortName: attr('string')
});
