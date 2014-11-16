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

    // create inventory objects for the join between player / item
    var store = this.store;
    model.get('items').then(function(items) {
      items.forEach(function(item) {
        var itemType = item.get('type');

        var idCreateHash = {
          player_id: player.get('id'),
          item_id: item.get('id'),
          item_type: itemType,
        };

        // Normal #save doesn't send IDS..lame
        Em.$.post('/api/v1/inventories', { inventory: idCreateHash }).then(function(inventory) {
          console.log(inventory);
        })
      })
    })

    player.save();
    return model.get('zone');
  },

  resetController: function (controller, isExiting, transition) {
    // remove all the battle references in the store
    // forcing to go back to the server to get the random'ish gameplay
    if (isExiting) this.store.unloadAll('battle');
  }

});
