import Ember from "ember";

export default Ember.Route.extend({
  // [g] do I really need both.. probably not -- but I just want to smash this bug
  // and make sure the player is always up to date when this page loads.
  resetController: function (controller, isExiting, transition) {
    if (this.get('session.player')) {
      return this.get('session.player').reload();
    }
  },

  actions: {
    didTransition: function() {
      if (this.get('session.player')) {
        return this.get('session.player').reload();
      }
    }
  }
});
