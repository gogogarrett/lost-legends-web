import Ember from "ember";

export default Ember.Route.extend({
  beforeModel: function() {
    this.get('session').set('user_id', 1)
  },

  actions: {
    heal: function() {
      var player = this.get('session.player');
      var maxHealth = player.get('max_health');
      player.set('current_health', maxHealth);
      player.save();
    }
  }
});
