import JSONAPIAdapter from 'ember-data/adapters/json-api';

export default JSONAPIAdapter.extend({
  host: 'http://' + window.EmberENV.API_HOST
});