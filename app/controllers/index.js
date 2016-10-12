import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['regionType'],
  regionType: null,
  actions: {
    refreshRoute(){
      console.log("route refresh");
      this.refresh(); // force reload / requery of the model
    }
  }
});
