import Ember from "ember";

export default Ember.Controller.extend({
  levelProgress: function() {
    if ( this.get('session.player.level_progress') <= 0 ) {
      return "width: 0%";
    } else {
      return "width:" + this.get('session.player.level_progress') + "%";
    }
  }.property('session.player.level_progress'),

  healthProgress: function() {
    if ( this.get('session.player.health_progress') <= 0 ) {
      return "width: 0%";
    } else {
      return "width:" + this.get('session.player.health_progress') + "%";
    }
  }.property('session.player.health_progress'),

  isEditingPoints: function() {
    return this.get('session.player.spending_points') > 0;
  }.property('session.player.spending_points'),

  buildSumArray: function(count) {
    var array = [];
    for (var x = 0; x < count; x++) { array.push(1); }
    return array;
  },

  pointsToSpend: function() {
    return this.buildSumArray(this.get('session.player.spending_points'));
  }.property('session.player.spending_points'),

  muscleArray: function() {
    return this.buildSumArray(this.get('session.player.muscle'));
  }.property('session.player.muscle'),

  intellectArray: function() {
    return this.buildSumArray(this.get('session.player.intellect'));
  }.property('session.player.intellect'),

  defenseArray: function() {
    return this.buildSumArray(this.get('session.player.defense'));
  }.property('session.player.defense'),

  arrayTotal: function (array) {
    var total = 0;
    Ember.$.each(array, function() { total += this; });
    return total;
  },

  musclePoints: function() {
    return this.arrayTotal(this.get('muscleArray'));
  }.property('muscleArray.@each'),

  intellectPoints: function() {
    return this.arrayTotal(this.get('intellectArray'));
  }.property('intellectArray.@each'),

  defensePoints: function() {
    return this.arrayTotal(this.get('defenseArray'));
  }.property('defenseArray.@each'),

  pointsToSpendComputed: function() {
    return this.arrayTotal(this.get('pointsToSpend'));
  }.property('pointsToSpend.@each'),

  actions: {
    add: function(type) {
      var name = type + "Array";

      if ( this.get('pointsToSpend').length) {
        this.get(name).pushObject(1);
        this.get('pointsToSpend').popObject();
      }
    },

    minus: function(type) {
      var name = type + "Array";
      var array = this.get(name);
      var playerKey = "session.player." + type;
      var playerValue = this.get(playerKey);

      if ( this.get('pointsToSpend').length >= 0 && array.length > 0 && array.length > playerValue) {
        array.popObject();
        this.get('pointsToSpend').pushObject(1);
      }
    },

    savePoints: function() {
      var player = this.get('session.player');

      player.set('muscle', this.get('musclePoints'));
      player.set('intellect', this.get('intellectPoints'));
      player.set('defense', this.get('defensePoints'));
      player.set('spending_points', 0);

      return player.save();
    }
  }
});
