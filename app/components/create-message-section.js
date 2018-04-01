import Component from '@ember/component';

export default Component.extend({
  classNames: ['create-message'],
  computedAttributes: ['email', 'url'],
  tagName: 'section'
});
