import DS from "ember-data";

export default DS.Model.extend({
  items: DS.hasMany('item', { async: true }),

  title: DS.attr('string'),
  exp: DS.attr('number'),
  hunts: DS.attr('number'),
  rubies: DS.attr('number'),
});
