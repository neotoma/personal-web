import JSONAPIAdapter from 'ember-data/adapters/json-api';

export default JSONAPIAdapter.extend({
  namespace: 'data',
  buildURL(type, id) {
    var url = this._super(type, id);

    if (!id) {
      url = url + '-all';
    }

    return url;
  }
});