import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['id'],
  classNameBindings: ['hidden'],
  classNames: ['intro'],
  computedAttributes: ['coverImageUrl', 'fullName', 'homeLocation', 'profession'],
  id: 'intro',
  tagName: 'section',

  hidden: Ember.computed('tagName', 'fullName', 'subheader', function() {
    return !(this.get('coverImageUrl') && this.get('fullName') && this.get('subheader'));
  }),

  imageStyle: Ember.computed('attributes.@each.value', function() {
    var coverImageUrl = this.get('coverImageUrl');

    if (coverImageUrl) {
      return Ember.String.htmlSafe(`background-image: url(${coverImageUrl}`);
    }
  }),

  subheader: Ember.computed('profession', 'homeLocation', function() {
    if (this.get('profession') && this.get('homeLocation')) {
      return `${this.get('profession')} based in ${this.get('homeLocation')}`;
    }
  })
});
