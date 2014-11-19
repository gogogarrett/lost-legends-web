import Ember from "ember";
import DS from "ember-data";

var decamelize = Ember.String.decamelize,
    underscore = Ember.String.underscore;

export default DS.RESTAdapter.extend({
  namespace: 'api/v1',
  coalesceFindRequests: true,

  pathForType: function (type) {
    var decamelized = decamelize(type);
    var underscored = underscore(decamelized);
    return Ember.String.pluralize(underscored);
  },
});
