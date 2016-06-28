import Ember from 'ember';

export function backgroundImageStyle(params/*, hash*/) {
  if (params[0]) {
    return Ember.String.htmlSafe(`background-image: url(${params[0]})`);
  }
}

export default Ember.Helper.helper(backgroundImageStyle);
