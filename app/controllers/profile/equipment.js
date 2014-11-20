import Ember from "ember";

export default Ember.ArrayController.extend({
  actions: {
    unequip: function(slot, item) {
      var player = this.get('session.player');
      var store = this.store;
      var self = this;

      store.find('item', item.get('id')).then(function(item) {
        var itemType = item.get('type');

        var createHash = {
          player: player,
          item: item,
          type: itemType,
        };

        var newInventory = store.createRecord('inventory', createHash);
        // TODO: newInventory.save();
        // hacky save way - because .save() doesn't work
        var idCreateHash = {
          player_id: player.get('id'),
          item_id: item.get('id'),
          item_type: itemType,
        };

        // Normal #save doesn't send IDS..lame
        Em.$.post('/api/v1/inventories', { inventory: idCreateHash }).then(function(inventory) {
          console.log(inventory);
        });
        slot.destroyRecord();

        self.transitionTo('profile.inventory')
      });
    }
  }
});
