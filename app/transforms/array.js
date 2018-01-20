import Ember from 'ember';
import Transform from 'ember-data/transform';

export default Transform.extend({
  deserialize(serialized) {
    return (Ember.typeOf(serialized) === "array") ? serialized : [];
  },

  serialize(deserialized) {
    var type = Ember.typeOf(deserialized);
    if (type === 'array') {
      return deserialized;
    } else if (type === 'string') {
      return deserialized.split(',').map(function(item) {
        return item.trim();
      });
    } else {
      return [];
    }
  }
});
