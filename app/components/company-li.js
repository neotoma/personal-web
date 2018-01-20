import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['hasImage:hasImage:hasNoImage', 'hasHeader:hasHeader:hasNoHeader'],
  tagName: 'li',

  hasImage: Ember.computed('company.logoUrl', function() {
    return (this.get('company.logoUrl'));
  }),

  hasHeader: Ember.computed('company.name', function() {
    return (this.get('company.name'));
  })
});
