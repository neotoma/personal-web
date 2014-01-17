App.Post = DS.Model.extend({
  slug:           DS.attr('string'),
  title:          DS.attr('string'),
  body:           DS.attr('string'),
  createdAt:      DS.attr('date'),
  updatedAt:      DS.attr('date'),
  publishedAt:    DS.attr('date')
});