import ComputedAttributesMixin from 'personal-web/mixins/computed-attributes';
import Ember from 'ember';
import FastbootDeferRendering from 'personal-web/mixins/fastboot-defer-rendering';

export function initialize() {
  Ember.Component.reopen(ComputedAttributesMixin);
  Ember.Component.reopen(FastbootDeferRendering);
}

export default { initialize };
