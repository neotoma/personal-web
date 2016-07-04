export function initialize(/* application */) {
  Ember.Router.reopen({
    headData: Ember.inject.service(),
    
    willTransition() {
      this._super.apply(this, arguments);

      this.set('headData.type', null);
      this.set('headData.imageUrl', null);
      this.set('headData.canonicalUrl', null);
      this.set('headData.description', null);
      this.set('headData.articlePublishedTime', null);
      this.set('headData.articleModifiedTime', null);
      this.set('headData.articleAuthor', null);
      this.set('headData.profileFirstName', null);
      this.set('headData.profileLastName', null);
      this.set('headData.profileGender', null);
    }
  });
}

export default {
  name: 'transition-meta',
  initialize
};
