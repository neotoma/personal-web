import dasherize from 'npm:dasherize';
import DS from 'ember-data';
import Ember from 'ember';
import isNumeric from 'personal-web/utils/is-numeric';
import md5 from 'ember-md5';
import { pluralize } from 'ember-inflector';

export default DS.Store.extend({
  boxNames: [],
  fastboot: Ember.inject.service(),

  init() {
    this._super(...arguments);
    this.set('boxNames', this.get('fastboot.shoebox').retrieve('boxNames'));
  },

  queryShoebox(modelName, query) {
    query = query ? query : {};

    var boxName = `${modelName}-${md5(JSON.stringify(query))}`,
      fastboot = this.get('fastboot'),
      shoebox = fastboot.get('shoebox'),
      store = this;

    return new Ember.RSVP.Promise((resolve, reject) => {
      if (!fastboot.get('isFastBoot') && shoebox.retrieve(boxName) && store.get('boxNames').indexOf(boxName) !== -1) {
        var payload = dasherize(shoebox.retrieve(boxName));

        store.get('boxNames').splice(store.get('boxNames').indexOf(boxName), 1);

        if (payload.errors) {
          reject(payload.errors[0]);
        } else {
          store.pushPayload(payload);
          Ember.RSVP.all(payload.data.map((resourceObject) => store.peekRecord(resourceObject.type, resourceObject.id))).then(resolve).catch(reject);
        }
      } else {
        if (fastboot.get('isFastBoot')) {
          var boxNames = shoebox.retrieve('boxNames');

          if (!boxNames) { boxNames = []; }

          boxNames.push(boxName);
          shoebox.put('boxNames', boxNames);
        }

        store.query(modelName, query).then((records) => {
          if (fastboot.get('isFastBoot')) {
            store.adapterFor(modelName).query(store, store.modelFor(modelName), query).then(payload => {
              shoebox.put(boxName, payload);
              resolve(records);
            });
          } else {
            resolve(records);
          }
        }).catch((error) => {
          if (fastboot.get('isFastBoot')) {
            shoebox.put(boxName, {
              errors: [error]
            });
          }

          reject(error);
        });
      }
    });
  },

  findAll(modelName, query) {
    return this.queryShoebox(modelName, query);
  },

  findRecord(modelName, id, query) {
    if (!query) { query = {}; }
    if (!query.filter) { query.filter = {}; }
    query.filter.id = isNumeric(id) ? parseInt(id) : id;

    return this.queryShoebox(modelName, query).then((records) => records ? records.get('firstObject') : undefined);
  },

  /**
   * Finds all records for given model names
   * @param {string[]|Object[]} models – Array of model names or objects that indicate types of records to find
   * @returns {Promise} Promise fulfilled with hash of records, keyed by model name pluralized
   */
  findAllForNames(models) {
    var recordsForTypes = {};

    models.forEach((model) => {
      if (typeof model === 'string') {
        recordsForTypes[pluralize(model)] = this.queryShoebox(model);
      } else if (typeof model === 'object') {
        recordsForTypes[pluralize(model['name'])] = this.queryShoebox(model['name'], {
          include: model['include'],
          limit: model['limit']
        });
      }
    });

    return Ember.RSVP.hash(recordsForTypes);
  }
});
