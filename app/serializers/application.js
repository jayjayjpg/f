import Ember from "ember";
import DS from 'ember-data';
//import JSONSerializer from 'ember-data/serializers/json';

export default DS.JSONAPISerializer.extend({
  keyForAttribute(key, method){
    return Ember.String.decamelize(key);
  }
});
