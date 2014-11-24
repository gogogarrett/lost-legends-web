import DS from "ember-data";

export default DS.Model.extend({
  slots: DS.hasMany('slot', { async: true }),
  inventories: DS.hasMany('inventory', { async: true }),

  dead: Ember.computed.lte('current_health', 0),
  // [g] should this be in the controller/component?
  displayCurrentHealth: function() {
    if ( this.get('current_health') <= 0 ) {
      return 0;
    } else {
      return this.get('current_health');
    }
  }.property('current_health'),

  title: DS.attr('string'),
  hunts: DS.attr('number'),
  rubies: DS.attr('number'),
  spending_points: DS.attr('number'),

  max_health: DS.attr('number'),
  current_health: DS.attr('number'),
  health_progress: DS.attr('number'),

  exp: DS.attr('number'),
  level_progress: DS.attr('number'),
  level: DS.attr('number'),

  muscle: DS.attr('number'),
  intellect: DS.attr('number'),
  defense: DS.attr('number')
});
