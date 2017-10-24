import attribute from 'personal-web/utils/attribute';
import Ember from 'ember';

export default function computedAttribute(attributeName) {
  return Ember.computed('attributes.@each.value', function() {
    return attribute(this.get('attributes'), attributeName);
  });
}
