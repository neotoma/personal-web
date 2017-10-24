import attribute from 'personal-web/utils/attribute';
import Ember from 'ember';

export default Ember.Route.extend({
  headData: Ember.inject.service(),

  model(params) {
    var include = 'image,photo';
    var queries = {
      attributes: this.store.findAll('attribute')
    };

    if (!isNaN(params.post_id)) {
      queries['post'] = this.store.findRecord('post', params.post_id, { include: include });
    } else {
      queries['posts'] = this.store.query('post', { filter: { slug: params.post_id }, include: include });
    }

    return Ember.RSVP.hash(queries).then((models) => {
      if (models['posts']) {
        models['post'] = models['posts'].get('firstObject');
        delete models['posts'];
      }

      return models;
    });
  },

  setupController(controller, models) {
    var post = models['post'];
    controller.set('post', post);

    this.set('headData.articleAuthor', post.get('author'));
    this.set('headData.articleModifiedTime', post.get('updatedAt'));
    this.set('headData.articlePublishedTime', post.get('publishedAt'));
    this.set('headData.canonicalUrl', attribute(models['attributes'], 'url') + this.router.generate('post', post.get('slug')));
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
