import Ember from "ember";

export default Ember.Controller.extend({
  levelProgress: function() {
    return "width:" + this.get('session.player.level_progress') + "%"
  }.property('session.player.level_progress'),

  isEditingPoints: function() {
    return this.get('session.player.spending_points') > 0
  }.property('session.player.spending_points'),

  pointsToSpend: function() {
    var pointsArray = [];
    var pointsToSpenddd = this.get('session.player.spending_points');
    for (var x = 0; x < pointsToSpenddd; x++) {
      pointsArray.push(1);
    }
    return pointsArray;
  }.property('session.player.spending_points'),

  muscleArray: function() {
    var muscleArray = [];
    var musclePoints = this.get('session.player.muscle');
    for (var x = 0; x < musclePoints; x++) {
      muscleArray.push(1);
    }
    return muscleArray;
  }.property('session.player.muscle'),

  intellectArray: function() {
    var intellectArray = [];
    var intellectPoints = this.get('session.player.intellect');
    for (var x = 0; x < intellectPoints; x++) {
      intellectArray.push(1);
    }
    return intellectArray;
  }.property('session.player.intellect'),

  defenseArray: function() {
    var defenseArray = [];
    var defensePoints = this.get('session.player.defense');
    for (var x = 0; x < defensePoints; x++) {
      defenseArray.push(1);
    }
    return defenseArray;
  }.property('session.player.defense'),

  musclePoints: function() {
    var total = 0;
    Em.$.each(this.get('muscleArray'), function() {
      total += this;
    })
    return total;
  }.property('muscleArray.@each'),

  intellectPoints: function() {
    var total = 0;
    Em.$.each(this.get('intellectArray'), function() {
      total += this;
    })
    return total;
  }.property('intellectArray.@each'),

  defensePoints: function() {
    var total = 0;
    Em.$.each(this.get('defenseArray'), function() {
      total += this;
    })
    return total;
  }.property('defenseArray.@each'),

  pointsToSpendComputed: function() {
    var total = 0;
    Em.$.each(this.get('pointsToSpend'), function() {
      total += this;
    })
    return total;
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
      var playerKey = "session.player." + type
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
