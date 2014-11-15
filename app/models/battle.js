import DS from "ember-data";

export default DS.Model.extend({
  zone: DS.belongsTo('zone', { async: true }),
  items: DS.hasMany('items', { async: true }),

  win: DS.attr('boolean'),
  exp: DS.attr('number'),
  rubies: DS.attr('number'),
  level: DS.attr('number'),
});
