import DS from "ember-data";

export default DS.Model.extend({
  parent: DS.belongsTo('zone', { async: true, inverse: 'zones' }),
  zones: DS.hasMany('zone', {async: true, inverse: 'parent'}),

  title: DS.attr('string'),
  desc: DS.attr('string'),
  root: DS.attr('boolean'),
  battle: DS.attr('boolean'),

  isBattle: Em.computed.bool('battle')
});
