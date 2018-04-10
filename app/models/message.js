import attr from 'ember-data/attr';
import Model from 'ember-data/model';

export default Model.extend({
  senderEmail: attr('string'),
  body: attr('string')
});
