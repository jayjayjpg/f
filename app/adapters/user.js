import Ember from 'ember';
import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  host: 'http://localhost:4100',
  namespace: 'auth',
  pathForType: function(type){
    return "register";
  },
  headers: {
    'Content-Type': 'application/json'
  }
});
