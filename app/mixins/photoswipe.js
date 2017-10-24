import Ember from 'ember';

export default Ember.Mixin.create({
  animationDuration: 250,

  items() {
    return this.get('controller.sortedPhotos').map(function(photo) {
      return {
        src: photo.get('imageUrl'),
        msrc: photo.get('imageUrl'),
        w: photo.get('width'),
        h: photo.get('height'),
        title: photo.get('description')
      };
    });
  },

  parseHash() {
    if (!window || !window.location) { return; }

    var hash = window.location.hash.substring(1),
    params = {};

    if(hash.length < 5) {
      return params;
    }

    var vars = hash.split('&');
    for (var i = 0; i < vars.length; i++) {
      if(!vars[i]) {
        continue;
      }
      var pair = vars[i].split('=');
      if(pair.length < 2) {
        continue;
      }
      params[pair[0]] = pair[1];
    }

    if(params.gid) {
      params.gid = parseInt(params.gid, 10);
    }

    return params;
  },

  viewPhotoByLink(link, animationDuration = this.get('animationDuration')) {
    var options = {
      index: Ember.$(link).parent().find('a').index(link),
      showAnimationDuration: animationDuration,
      hideAnimationDuration: animationDuration,
      bgOpacity: 0.9,
      preload: [2,2],
      showHideOpacity: true,
      getThumbBoundsFn: function() {
        var pageYScroll = 0;

        if (window && window.pageYOffset) {
          pageYScroll = window.pageYOffset;

          if (typeof document !== 'undefined' && document.documentElement.scrollTop) {
            window.pageYOffset = document.documentElement.scrollTop;
          }
        }
        var rect = link.getBoundingClientRect();

        return {
          x: rect.left,
          y: rect.top + pageYScroll,
          w: rect.width
        };
      }
    };

    var gallery = new PhotoSwipe(Ember.$('.pswp')[0], PhotoSwipeUI_Default, this.items(), options);
    gallery.init();
  },

  viewPhoto(photo) {
    this.viewPhotoByLink(Ember.$('#photo-' + photo.get('id'))[0]);
  },

  viewPhotoByIndex(index, animationDuration) {
    var link = Ember.$('section.photos div.thumbs a')[index - 1];

    if (link && Ember.$(link).attr('href')) {
      this.viewPhotoByLink(link, animationDuration);
    }
  },

  didInsertElement() {
    var hashData = this.parseHash();

    if (hashData.pid) {
      this.viewPhotoByIndex(hashData.pid, 0);
    }
  },

  actions: {
    viewPhoto: function(photo) {
      this.viewPhoto(photo);
    }
  }
});
