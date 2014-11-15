import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('zones', { path: "/" });
  this.resource('zone', { path: "/:zone_id" });
});

export default Router;
