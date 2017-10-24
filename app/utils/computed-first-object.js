import Ember from 'ember';

export default function computedFirstObject(modelType) {
  return Ember.computed(`${modelType}.firstObject`, function() {
    return this.get(`${modelType}.firstObject`);
  });
}
