import Ember from 'ember';

export default Ember.Route.extend({
  headData: Ember.inject.service(),

  model(params) {
    return this.store.findRecord('post', params.post_id);
  },

  setupController(controller, model) {
    var self = this;

    controller.set('post', model);
    this.set('id', this.paramsFor('post').post_id);
    this.set('titleToken', model.get('title'));
    this.set('headData.type', 'article');
    this.set('headData.imageUrl', model.get('imageUrl'));
    this.set('headData.description', model.get('excerpt'));
    this.set('headData.articlePublishedTime', model.get('publishedAt'));
    this.set('headData.articleModifiedTime', model.get('updatedAt'));
    this.set('headData.articleAuthor', model.get('author'));

    Ember.run.next(function() {
      self.set('headData.url', window.location.href);
    });
  }
});