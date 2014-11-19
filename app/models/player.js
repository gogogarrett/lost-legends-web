import DS from "ember-data";

export default DS.Model.extend({
  slots: DS.hasMany('slot', { async: true }),
  inventories: DS.hasMany('inventory', { async: true }),

  title: DS.attr('string'),
  hunts: DS.attr('number'),
  rubies: DS.attr('number'),
  spending_points: DS.attr('number'),

  exp: DS.attr('number'),
  level_progress: DS.attr('number'),
  level: DS.attr('number'),

  muscle: DS.attr('number'),
  intellect: DS.attr('number'),
  defense: DS.attr('number')
});
