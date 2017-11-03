import attribute from 'personal-web/utils/attribute';
import Ember from 'ember';

export default Ember.Route.extend({
  headData: Ember.inject.service(),

  model(params) {
    return Ember.RSVP.hash({
      attributes: this.store.findAll('attribute'),
      post: this.store.findRecord('post', params.post_id, { include: 'image,photo' })
    });
  },

  setupController(controller, models) {
    var post = models['post'];
    controller.set('post', post);

    this.set('headData.articleAuthor', post.get('author'));
    this.set('headData.articleModifiedTime', post.get('updatedAt'));
    this.set('headData.articlePublishedTime', post.get('publishedAt'));
    this.set('headData.canonicalUrl', attribute(models['attributes'], 'url') + this.router.generate('post', post.get('id')));
    this.set('headData.description', post.get('excerpt'));
    this.set('headData.imageUrl', post.get('imageUrl'));
    this.set('headData.title', post.get('title'));
    this.set('headData.type', 'article');
  },

  actions: {
    error(error) {
      if (error) {
        this.intermediateTransitionTo('not-found', error);
      }
    }
  }
});
