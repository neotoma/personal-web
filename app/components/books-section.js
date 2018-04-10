import ListingsComponent from 'personal-web/components/listings-section';

export default ListingsComponent.extend({
  listingLi: 'book-li',
  modelName: 'book',
  sort: '-releasedAt,-publishedAt'
});
