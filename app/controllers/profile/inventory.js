import Ember from "ember";

export default Ember.ArrayController.extend({
  actions: {
    equip: function(inventory, item) {
      var player = this.get('session.player');
      var store = this.store;
      var self = this;

      store.find('item', item.get('id')).then(function(item) {
        player.get('slots').then(function(slots){
          var itemType = item.get('type');

          // Only "equip" if there aren't any others of that type already equipped
          if ( slots.filterBy('type', itemType).length == 0 ) {

            var createHash = {
              player: player,
              item: item,
              type: itemType,
            };

            var newSlot = store.createRecord('slot', createHash);
            // TODO: newSlot.save();
            // hacky save way - because .save() doesn't work
            var idCreateHash = {
              player_id: player.get('id'),
              item_id: item.get('id'),
              item_type: itemType,
            };

            // Normal #save doesn't send IDS..lame
            Em.$.post('/api/v1/slots', { slot: idCreateHash }).then(function(slot) {
              console.log(slot);
            });
            inventory.destroyRecord();
          }
        })

        self.transitionTo('profile.equipment')
      });
    }
  }
});
