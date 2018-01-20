import ENV from 'personal-web/config/environment';
import JSONAPIAdapter from 'ember-data/adapters/json-api';

export default JSONAPIAdapter.extend({
  host: ENV.EmberENV.API_HOST
});
