App.ApplicationController = Ember.Controller.extend({
  scrollTop: '0',
  headerHeight: 88,
  maxHeaderHeight: 88,
  minHeaderHeight: 56,

  setTitle: function(title, subtitle) {
    document.title = title;
    this.set('title', title);
    this.set('subtitle', subtitle);
  },

  init: function () {
    this._super();
    Ember.run.schedule("afterRender", this, function() {
      this.send("afterRender");
    });
  },

  actions: {
    afterRender: function() {
      var self = this;
      $(window).scroll(function() {
        self.set('scrollTop', $(window).scrollTop());
      });
    }
  }
});