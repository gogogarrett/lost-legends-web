import Ember from "ember";

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('zone', params.zone_id);
  },

  afterModel: function (model, _) {
    if (model.get('battle')) {
      return this.transitionTo('zone.battle', model.get('id')) ;
    }
  }
});
