import Ember from "ember";

export default Ember.Route.extend({

  beforeModel: function() {
    var player = this.get('session.player');
    var hunts = player.get('hunts');

    if ( hunts === 0 ) return this.transitionTo('zones');

    var newHuntsCount = hunts - 1;
    player.set('hunts', newHuntsCount);
    player.save();
  },

  model: function(params) {
    var zoneId = this.modelFor('zone').get('id');
    return this.store.find('battle', zoneId);
  },

  afterModel: function (model, _) {
    var player = this.get('session.player');

    // update players exp
    if ( !isNaN(model.get('exp')) ) {
      var newExp = player.get('exp') + model.get('exp');
      player.set('exp', newExp);
    }

    // update players rubies
    if ( !isNaN(model.get('rubies')) ) {
      var newRubies = player.get('rubies') + model.get('rubies');
      player.set('rubies', newRubies);
    }

    model.get('items').then(function(item) {
      player.get('items').pushObjects(item);
    });

    player.save();

    return model.get('zone');
  },

  resetController: function (controller, isExiting, transition) {
    // remove all the battle references in the store
    // forcing to go back to the server to get the random'ish gameplay
    if (isExiting) this.store.unloadAll('battle');
  }

});
