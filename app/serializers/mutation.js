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
    var labels = {}; // { patientLabel: patientIndexForComponent, ....}
    var rowLabels = {};
    var newJsonData = {};
    var currentLabelLen = 0;
    var currentRowLen = 0;
    var currentPatient = json.data[0].attributes['label'];
    var currentSnp = json.data[0].attributes['row_label'];
    labels[currentPatient] = currentLabelLen;
    rowLabels[currentSnp] = currentRowLen;
    console.log("currentPatient normalizeResponse mutation serializer: " + JSON.stringify(currentPatient));
    var patientIndex = 0;
    var snpIndex = 0;
    var result = json.data.map(function(obj, index){
      currentPatient = obj.attributes['label'];
      currentSnp = obj.attributes['row_label'];
      if (currentPatient in labels){
        patientIndex = labels[currentPatient];
      }
      else {
        currentLabelLen = Object.keys(labels).length -1;
        patientIndex = currentLabelLen + 1;
        labels[currentPatient] = patientIndex;
      }

      if(currentSnp in rowLabels){
        snpIndex = rowLabels[currentSnp];
      }
      else {
        currentRowLen = Object.keys(rowLabels).length -1;
        snpIndex = currentRowLen + 1;
        rowLabels[currentSnp] = snpIndex;
      }
      console.log("labels obj: "  + JSON.stringify(labels));
      obj.attributes.col = labels[currentPatient];
      obj.attributes.row = rowLabels[currentSnp];
      return obj;
    });
    newJsonData.data = result;
    // json.data.attributes.col = 0; // TODO: repair the JSON API format
    return newJsonData;
  } 
});
