import Component from '@ember/component';

export default Component.extend({
  init() {
    this._super(...arguments);

    this.findAll('category').then((categories) => {
      this.set('categories', categories);
    });
  }
});
