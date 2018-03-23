import ComputedAttributesMixin from 'personal-web/mixins/computed-attributes';
import Ember from 'ember';
import FastbootDeferRendering from 'personal-web/mixins/fastboot-defer-rendering';
import QueryManager from 'personal-web/mixins/query-manager';

export function initialize() {
  Ember.Component.reopen(ComputedAttributesMixin);
  Ember.Component.reopen(FastbootDeferRendering);
  Ember.Component.reopen(QueryManager);
}

export default { initialize };
