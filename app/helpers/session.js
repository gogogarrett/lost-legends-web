import Ember from "ember";

export default Ember.Object.extend({
  player: null,
  user_id: null,

  playerChanged: function() {
    var userId = this.get('user_id');
    var that = this;

    if (!Ember.isEmpty(userId)) {
      that.container.lookup("store:main").find("player", userId).then(function(user) {
        that.set('player', user);
      });
    }
  }.observes('user_id')
});
