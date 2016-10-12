import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  queryParams: {
    regionType: {
      refreshModel: true
    }
  },
  model(param){
      var self = this;
      console.log("fab model param: " + JSON.stringify(param));
      if (param.regionType == null){
        return RSVP.hash({
          snps: this.get('store').query('snp',{
            region: 'missense'
          }),
          mutations: this.get('store').findAll('mutation')
        }); 
      }
      // can now filter for SNPs with different region types
      return RSVP.hash({
          snps: this.get('store').query('snp',{
            region: param.regionType // TODO: access the region parameter by model param
          })
        }).then(function(results){
           var filteredSnpIds = results.snps.mapBy('rsId').join(",");
           console.log("rsvp results: " + filteredSnpIds);
           return RSVP.hash({
              snps: results.snps,
              mutations: self.get('store').query('mutation',{
                rsId: filteredSnpIds
              })
           });
        });
          /* return this.get('store').query('mutation', {
             rsId: filteredSnpIds.join(",")
           }) */
  }
});
