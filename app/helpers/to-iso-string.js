import Ember from 'ember';

export function toIsoString(params/*, hash*/) {
  return params[0].toISOString();
}

export default Ember.Helper.helper(toIsoString);
