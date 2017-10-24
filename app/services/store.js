import DS from 'ember-data';
import Ember from 'ember';
import {pluralize} from 'ember-inflector';

export default DS.Store.extend({
  /**
   * Finds all records for given model names
   * @param {string[]|Object[]} modelNames – Array of model names or objects that indicate types of records to find
   * @returns {Promise} Promise fulfilled with hash of records, keyed by model name pluralized
   */
  findAllForNames(modelNames) {
    var recordsForTypes = {};

    modelNames.forEach((modelName) => {
      if (typeof modelName === 'string') {
        recordsForTypes[pluralize(modelName)] = this.findAll(modelName);
      } else if (typeof modelName === 'object') {
        recordsForTypes[pluralize(modelName['name'])] = this.query(modelName['name'], { include: modelName['include'] });
      }
    });

    return Ember.RSVP.hash(recordsForTypes);
  }
});
