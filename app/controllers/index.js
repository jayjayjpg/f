import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['regionType'],
  regionType: null,
  uniqueSnps: Ember.computed('content', function(){
    let content = this.get('content');
    return content.snps.uniqBy('genomicRegion');
  }),
  gotFilteredSnps: Ember.computed.bool('content.filteredSnps'),
  numOfSnps: Ember.computed('content', function(){
    return this.get('content').filteredSnps.get('length');
  }),
  numOfMut: Ember.computed('numOfSnps', function(){
    return this.get('content').mutations.get('length');
  }),
  foundMut: Ember.computed.notEmpty('content.mutations'),
  actions: {
    refreshRoute(){
      console.log("route refresh");
      this.refresh(); // force reload / requery of the model
    },
    queryMutations(val){
      this.transitionToRoute('index', {
        queryParams: {
          regionType: val
        }
      })
    }
  }
});
