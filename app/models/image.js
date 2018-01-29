import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';
import Model from 'ember-data/model';
import orientation from 'personal-web/utils/orientation';

export default Model.extend({
  assetUrl: attr('string'),
  description: attr('string'),
  height: attr('number'),
  orientation: orientation,
  posts: hasMany('post'),
  type: attr('string'),
  width: attr('number')
});
