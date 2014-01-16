App.Post = DS.Model.extend({
  title:          DS.attr('string'),
  body:           DS.belongsTo('story'),
  createdAt:      DS.attr('date'),
  updatedAt:      DS.attr('date'),
  publishedAt:    DS.attr('date'),

  publishedAtReadable: function() {
    return this.get('publishedAt');
  }.property('publishedAt')
});