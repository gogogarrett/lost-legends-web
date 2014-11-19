import DS from "ember-data";

export default DS.Model.extend({
  battle: DS.belongsTo('battle', { async: true }),

  title: DS.attr('string'),
  desc: DS.attr('string'),
});
