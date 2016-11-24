//import ApplicationSerializer from './application';
import Ember from 'ember';
import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  attrs: {
    x: 'patient-id',
    y: 'rs-id',
    value: 'score'
  }
});
