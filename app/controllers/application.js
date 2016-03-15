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

  headerStyle: function() {
    var height;
    height = (this.get('maxHeaderHeight') - this.get('scrollTop'));

    if (height < this.get('minHeaderHeight')) {
      height = this.get('minHeaderHeight');
    }

    this.set('headerHeight', height);
    return 'height: ' + (height / 16).toString() + 'em';

  }.property('scrollTop'),

  headerTitleStyle: function() {
    var fontSize = this.get('headerHeight') / this.get('maxHeaderHeight');
    return 'font-size: ' + fontSize + 'em';

  }.property('headerHeight'),

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