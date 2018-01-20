import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['hasImage:hasImage:hasNoImage', 'hasHeader:hasHeader:hasNoHeader'],
  tagName: 'li',

  hasImage: Ember.computed('checkin.photoUrl', function() {
    return (this.get('checkin.photoUrl'));
  }),

  hasHeader: Ember.computed('checkin.placeName', function() {
    return (this.get('checkin.placeName'));
  })
});
