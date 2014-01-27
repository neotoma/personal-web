App.ApplicationController = Ember.Controller.extend({
  setTitle: function(title, subtitle) {
    document.title = title;
    this.set('title', title);
    this.set('subtitle', subtitle);
  }
});