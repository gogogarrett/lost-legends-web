import Ember from "ember";
import Session from "../helpers/session"

export default {
  name: 'player',

  initialize: function(container, application) {
    application.register('session:main', Session);

    application.inject('controller', 'session', 'session:main');
    application.inject('route', 'session', 'session:main');
    application.inject('mixin', 'session', 'session:main');
  },
};
