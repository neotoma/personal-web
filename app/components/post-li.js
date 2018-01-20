import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['hasImage:hasImage:hasNoImage', 'hasHeader:hasHeader:hasNoHeader'],
  tagName: 'li',

  hasImage: Ember.computed('post.imageUrl', function() {
    return (this.get('post.imageUrl'));
  }),

  hasHeader: Ember.computed('post.title', function() {
    return (this.get('post.title'));
  })
});
