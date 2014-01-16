App.Post = DS.Model.extend({
  title:          DS.attr('string'),
  body:           DS.attr('string'),
  createdAt:      DS.attr('date'),
  updatedAt:      DS.attr('date'),
  publishedAt:    DS.attr('date'),

  publishedAtReadable: function() {
    return '12/1/13';
    //return this.get('publishedAt');
  }.property('publishedAt')
});