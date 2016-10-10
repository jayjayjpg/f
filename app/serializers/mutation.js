import ApplicationSerializer from './application';
import Ember from 'ember';

export default ApplicationSerializer.extend({
  /* keyForAttribute(key, method){
    return Ember.String.decamelize(key);
  }, */
  attrs: {
    label: 'patient-id',
    row_label: 'rs-id'
  },
  normalizeResponse(store, primaryModelClass, payload, id, requestType){
    var json = this._super(...arguments);
    var labels = {};
    var currentPatient = json.data[0].attributes['patient-id'];
    var currentSnp = json.data[0].attributes['rs-id'];
    var patientIndex = 0;
    var snpIndex = 0;
    var result = json.data.map(function(obj, index){
      if (currentPatient !== obj.attributes['patient-id']){
        patientIndex += 1;
      }
      obj.attributes.col = patientIndex;
      return obj;
    });
    // json.data.attributes.col = 0; // TODO: repair the JSON API format
    return result;
  } 
});
