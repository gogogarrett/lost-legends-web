import Ember from "ember";

export default Ember.ArrayController.extend({
  actions: {
    equip: function(item) {
      var player = this.get('session.player');
      var store = this.store;

      player.get('equipped_items').then(function(equipped_items){
        var itemType = item.get('type');

        if ( equipped_items.filterBy('type', itemType).length == 0 ) {
          var createHash = {
            player: player,
            item: item,
            type: itemType,
          };

          store.createRecord('slot', createHash);

          var idCreateHash = {
            player_id: player.get('id'),
            item_id: item.get('id'),
            item_type: itemType,
          };

          // Normal #save doesn't send IDS..lame
          Em.$.post('/api/v1/slots', { slot: idCreateHash }).then(function(slot) {
            console.log(slot);
          })
        }
      });
    }
  }
});
