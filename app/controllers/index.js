import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['regionType'],
  regionType: null,
  currentSuperSnp: null,
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
  currentMutations: Ember.computed('currentSuperSnp', function(){
    let currentMuts = this.get('content').mutations.filterBy('y', this.get('currentSuperSnp'));
    return currentMuts.filterBy('value', 1);
  }),
  numOfCurrentMut: Ember.computed('currentSuperSnp', function(){
    return this.get('currentMutations').get('length');
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
      });
    },
    getThatSnpMetaData(rsId){
      console.log("meta data in index controller:" + rsId);
      this.set('currentSuperSnp', rsId);
     /* let mutationsSum = this.get('content').query('mutation',{
        rsId: filteredSnpIds
      }) */
    }
  }
});
