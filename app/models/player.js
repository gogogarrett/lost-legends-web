import DS from "ember-data";

export default DS.Model.extend({
  slots: DS.hasMany('slot', { async: true }),
  inventories: DS.hasMany('inventory', { async: true }),

  title: DS.attr('string'),
  exp: DS.attr('number'),
  hunts: DS.attr('number'),
  rubies: DS.attr('number'),

  level: function() {
    var exp = this.get('exp');

    // gross
    if (exp >= 0 && exp <= 100) {
      return 1;
    } else if (exp >= 101 && exp <= 200) {
      return 2;
    } else if (exp >= 201 && exp <= 400) {
      return 3;
    } else if (exp >= 401 && exp <= 800) {
      return 4;
    } else if (exp >= 801 && exp <= 1200) {
      return 5;
    } else {
      return 6;
    }
  }.property('exp'),

  levelProgress: function() {
    var level = this.get('level')
    var totalExp = this.findLevelExp(level)
    return this.get('exp') / totalExp * 100
  }.property('level', 'exp'),

  findLevelExp: function(level) {
    // [g] gross
    if (level == 1) {
      return 100
    } else if (level == 2) {
      return 200
    } else if (level == 3) {
      return 400
    } else if (level == 4) {
      return 800
    } else if (level == 5) {
      return 1200
    } else {
      return 2400
    }
  }
});
