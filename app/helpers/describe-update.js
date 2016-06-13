import Ember from 'ember';

export function describeUpdate(params) {
  var update = params[0];
  
  if (update.get('photo')) {
    return update.get('photo.description');
  }
}

export default Ember.Helper.helper(describeUpdate);
