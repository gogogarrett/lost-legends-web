import DS from "ember-data";

export default DS.Model.extend({
  zone: DS.belongsTo('zone', { async: true }),

  player: DS.belongsTo('player', { async: true }),
  battle: DS.belongsTo('battle', { async: true }),
  monster: DS.belongsTo('monster', { async: true }),
  items: DS.hasMany('items', { async: true }),

  inProgress: Em.computed.equal('status', 'in-progress'),
  complete: Em.computed.not('inProgress'),

  won: Em.computed.equal('status', 'won'),
  fail: Em.computed.equal('status', 'fail'),

  status: DS.attr('string'),
  rubies: DS.attr('number'),
  exp: DS.attr('number'),
  attack_damage: DS.attr('number'),
  player_damage: DS.attr('number'),
});
