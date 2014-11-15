import Ember from "ember";

export default Ember.ArrayController.extend({
  rootZones: Ember.computed.filter('model', function(zone) {
    return zone.get('root') === true;
  })
});
