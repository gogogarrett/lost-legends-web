import Ember from "ember";

export default Ember.Controller.extend({
  levelProgress: function() {
    return "width:" + this.get('session.player.levelProgress') + "%"
  }.property('session.player.levelProgress')
});
