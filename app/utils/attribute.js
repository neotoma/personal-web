/**
 * Return attribute value extracted from collection of attributes
 * @param {Object[]} [attributes] - Collection of attributes
 * @param {string} name - Name of attribute for which to extract value
 */
export default function(attributes, name) {
  if (!attributes) { return; }

  var attribute = attributes.findBy('id', name);

  if (attribute && attribute.get('value')) {
    return attribute.get('value');
  }
}
