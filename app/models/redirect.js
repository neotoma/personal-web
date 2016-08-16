import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  legacyPath: attr('string'),
  resourceModel: attr('string'),
  resourceId: attr('number')
});
