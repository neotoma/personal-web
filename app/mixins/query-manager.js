import Ember from 'ember';

export default Ember.Mixin.create({
  findAll (modelName, conditions) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      var query = this.get('store').findAll(modelName, conditions).then(resolve).catch((error) => {
        Ember.Logger.error(`${modelName} records not found`, error);
        reject(error);
      });

      this.deferRendering(query);
    });
  },

  findOne (modelName, conditions) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      this.findAll(modelName, Object.assign({ limit: 1 }, conditions ? conditions : {})).then((records) => {
        resolve(records ? records.get('firstObject') : undefined);
      }).catch(reject);
    });
  },

  queryHash (hash) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      this.deferRendering(Ember.RSVP.hashSettled(hash).then(resolve).catch(reject));
    });
  }
});
