App.ContractController = Ember.Controller.extend({
  needs: ['application'],

  init: function () {
    this._super();
    Ember.run.schedule("afterRender", this, function() {
      this.send("afterRender");
    });
  },

  actions: {
    afterRender: function() {
      /*
       * Replace all SVG images with inline SVG
       * Adapter from http://stackoverflow.com/questions/24933430/img-src-svg-changing-the-fill-color
       */
      $('img').each(function(){
        var $img = $(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        if (!$img.attr('src').endsWith('.svg')) {
          return;
        }

        $.get(imgURL, function(data) {
          // Get the SVG tag, ignore the rest
          var $svg = $(data).find('svg');

          // Add replaced image's ID to the new SVG
          if(typeof imgID !== 'undefined') {
              $svg = $svg.attr('id', imgID);
          }
          // Add replaced image's classes to the new SVG
          if(typeof imgClass !== 'undefined') {
              $svg = $svg.attr('class', imgClass+' replaced-svg');
          }

          // Remove any invalid XML tags as per http://validator.w3.org
          $svg = $svg.removeAttr('xmlns:a');

          // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
          if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
              $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
          }

          // Replace image with new SVG
          $img.replaceWith($svg);
        }, 'xml');
      });
    }
  }
});