import Ember from 'ember';

export function compare(params) {
  var [lvalue, operator, rvalue] = params;
  var operators;
      
  if (params.length < 3) {
    throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
  }
  
  operators = {
    '===': function (l, r) { return l === r; },
    '!==': function (l, r) { return l !== r; },
    '<': function (l, r) { return l < r; },
    '>': function (l, r) { return l > r; },
    '<=': function (l, r) { return l <= r; },
    '>=': function (l, r) { return l >= r; },
    'typeof': function (l, r) { return typeof l === r; }
  };
  
  if (!operators[operator]) {
    throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
  }
  
  return operators[operator](lvalue, rvalue);
}

export default Ember.Helper.helper(compare);