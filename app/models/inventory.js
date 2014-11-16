import DS from "ember-data";

export default DS.Model.extend({
  player: DS.belongsTo('player', { async: true }),
  item: DS.belongsTo('item', { async: true }),
  type: DS.attr('string'),
});
