import Ember from "ember";

export default Ember.Route.extend({
  beforeModel: function() {
    this.get('session').set('user_id', 1)
  }
});
