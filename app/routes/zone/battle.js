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
    var player = this.get('session.player');
    var store = this.store;

    var idCreateHash = {
      player_id: player.get('id'),
      battle_id: zoneId,
    };

    return Em.$.post('/api/v1/player_battles', { player_battle: idCreateHash }).then(function(data) {
      var battleId = data.player_battle.id;
      return store.find('playerBattle', battleId);
    });
  },

  afterModel: function (model, _) {
    return model.get('zone');
  },

  setupController: function(controller, model) {
    // this.super();
    controller.set('model', model);

    var zoneId = this.modelFor('zone').get('id');
    controller.set('zoneId', zoneId);
  },

  actions: {
    attack: function() {
      // [g] why do I need context..instead of model?
      var context = this.get('context');
      var player = this.get('session.player');
      var store = this.store;

      var attackParams = {
        player_battle: {
          id: context.get('id'),
          player_id: player.get('id'),
        }
      };

      Ember.$.ajax({
        url: "/api/v1/player_battles/" + context.get('id') + "/attack",
        type: "POST",
        // url: "/api/v1/player_battles/" + context.get('id'),
        // type: 'PATCH',
        data: attackParams,
      }).then(function(data) {
        console.log(data);
      });


      // [g] gross
      // if (Math.floor(Math.random() * 100) > 50) {
        // context.set('status', 'won');
      // } else {
        // context.set('status', 'fail');
      // }

      // context.save().then(function(model) {

      //   if ( model.get('complete') ) {

      //     if ( model.get('won') ) {

      //       // update players exp
      //       if ( !isNaN(model.get('exp')) ) {
      //         var newExp = player.get('exp') + model.get('exp');
      //         player.set('exp', newExp);
      //       }

      //       // update players rubies
      //       if ( !isNaN(model.get('rubies')) ) {
      //         var newRubies = player.get('rubies') + model.get('rubies');
      //         player.set('rubies', newRubies);
      //       }

      //       model.get('items').then(function(items) {
      //         items.forEach(function(item) {
      //           var itemType = item.get('type');

      //           var idCreateHash = {
      //             player_id: player.get('id'),
      //             item_id: item.get('id'),
      //             item_type: itemType,
      //           };

      //           // Normal #save doesn't send IDS..lame
      //           Em.$.post('/api/v1/inventories', { inventory: idCreateHash }).then(function(inventory) {
      //             console.log(inventory);
      //           })
      //         })
      //       })

      //       player.save().then(function(player) {
      //         console.log(player);
      //       });
      //     }
      //   }
      // });
    }
  }
});
