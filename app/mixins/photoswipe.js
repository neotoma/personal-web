import Ember from 'ember';

export default Ember.Mixin.create({
  items: function() {
    return this.get('controller.photos').map(function(photo) {
      return {
        src: photo.get('imageUrl'),
        msrc: photo.get('imageUrl'),
        w: photo.get('width'),
        h: photo.get('height'),
        title: photo.get('description')
      }
    });
  },

  actions: {
    viewPhoto: function(photo) {
      var link = $('a[href="' + photo.get('imageUrl') + '"]');

      var options = {
        index: link.parent().find('a').index(link),
        showAnimationDuration: 250,
        hideAnimationDuration: 250,
        bgOpacity: 0.8,
        preload: [2,2],
        getThumbBoundsFn: function(index) {
          // get window scroll Y
          var pageYScroll = window.pageYOffset || document.documentElement.scrollTop; 
          // optionally get horizontal scroll

          // get position of element relative to viewport
          var rect = link[0].getBoundingClientRect(); 

          // w = width
          return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
        }
      };

      var gallery = new PhotoSwipe($('.pswp')[0], PhotoSwipeUI_Default, this.items(), options);
      gallery.init();
    },

    didTransition: function() {
      var initPhotoSwipeFromDOM = function(gallerySelector) {

        // parse picture index and gallery index from URL (#&pid=1&gid=2)
        var photoswipeParseHash = function() {
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
        };


        // Parse URL and open gallery if it contains #&pid=3&gid=1
        var hashData = photoswipeParseHash();
        if(hashData.pid && hashData.gid) {
          openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
        }
      };
    }
  }
});
