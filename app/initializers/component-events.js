import ComponentEventsMixin from '../mixins/component-events';

export function initialize(/* application */) {
  Ember.Component.reopen(ComponentEventsMixin);
}

export default {
  name: 'component-events',
  initialize
};