import attribute from 'personal-web/utils/attribute';
import Ember from 'ember';

export default Ember.Route.extend({
  headData: Ember.inject.service(),

  model(params) {
    return Ember.RSVP.hash({
      attributes: this.store.findAll('attribute'),
      book: this.store.findRecord('book', params.book_id, { include: 'image,photo' })
    });
  },

  setupController(controller, models) {
    var book = models['book'];
    controller.set('book', book);

    this.set('headData.articleAuthor', book.get('author'));
    this.set('headData.articleModifiedTime', book.get('updatedAt'));
    this.set('headData.articlePublishedTime', book.get('publishedAt'));
    this.set('headData.canonicalUrl', attribute(models['attributes'], 'url') + this.router.generate('book', book.get('id')));
    this.set('headData.description', book.get('excerpt'));
    this.set('headData.imageUrl', book.get('coverImageUrl'));
    this.set('headData.title', book.get('title'));
    this.set('headData.type', 'book');
  },

  actions: {
    error(error) {
      if (error) {
        this.intermediateTransitionTo('not-found', error);
      }
    }
  }
});
