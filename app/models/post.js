App.Post = DS.Model.extend({
  slug:           DS.attr('string'),
  title:          DS.attr('string'),
  body:           DS.attr('string'),
  createdAt:      DS.attr('string'),
  updatedAt:      DS.attr('string'),
  publishedAt:    DS.attr('string')
});