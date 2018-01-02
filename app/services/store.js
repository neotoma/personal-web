import DS from 'ember-data';
import Ember from 'ember';
import md5 from 'ember-md5';
import {pluralize} from 'ember-inflector';

export default DS.Store.extend({
  boxes: [],
  fastboot: Ember.inject.service(),

  init() {
    this._super(...arguments);
    this.set('boxes', this.get('fastboot.shoebox').retrieve('boxes'));
  },

  queryShoebox(modelName, query) {
    query = query ? query : {};

    var boxName = `${modelName}-${md5(JSON.stringify(query))}`,
      fastboot = this.get('fastboot'),
      shoebox = fastboot.get('shoebox'),
      store = this;

    return new Ember.RSVP.Promise((resolve) => {
      if (!fastboot.get('isFastBoot') && shoebox.retrieve(boxName) && store.get('boxes').indexOf(boxName) !== -1) {
        var payload = shoebox.retrieve(boxName);

        store.pushPayload(payload);
        store.get('boxes').splice(store.get('boxes').indexOf(boxName), 1);

        Ember.RSVP.all(payload.data.map((resourceObject) => store.peekRecord(resourceObject.type, resourceObject.id))).then(resolve);
      } else {
        store.query(modelName, query).then((records) => {
          if (fastboot.get('isFastBoot')) {
            var boxes = shoebox.retrieve('boxes');

            if (!boxes) { boxes = []; }

            boxes.push(boxName);
            shoebox.put('boxes', boxes);

            store.adapterFor(modelName).query(store, store.modelFor(modelName), query).then(payload => {
              shoebox.put(boxName, payload);
              resolve(records);
            });
          } else {
            resolve(records);
          }
        });
      }
    });
  },

  findAll(modelName) {
    return this.queryShoebox(modelName);
  },

  findRecord(modelName, id, query) {
    if (!query) { query = {}; }
    if (!query.filter) { query.filter = {}; }
    query.filter.id = id;

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
