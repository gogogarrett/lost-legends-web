import Ember from "ember";

export default Ember.Route.extend({
  beforeModel: function() {
    this.get('session').set('user_id', 1)
  },

  actions: {
    heal: function() {
      var player = this.get('session.player');
      var maxHealth = player.get('max_health');

      var hunts = player.get('hunts');
      var newHuntsCount = hunts - 1;

      player.set('hunts', newHuntsCount);
      player.set('current_health', maxHealth);
      player.save();
    }
  }
});
