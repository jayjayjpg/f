import Ember from 'ember';
import DS from 'ember-data';
import config from '../config/environment';

export default DS.RESTAdapter.extend({
  host: `${config.host}`,
  namespace: 'auth',
  pathForType: function(type){
    return "register";
  },
  headers: {
    'Content-Type': 'application/json'
  }
});
