import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  model(){
      var self = this;
      /* return RSVP.hash({
        snps: this.get('store').query('snp',{
          region: 'missense'
        }),
        mutations: this.get('store').query('mutation',{
          rsId: 'rs2425019'
        })
      }); */
      // can now filter for SNPs with different region types
      return RSVP.hash({
          snps: this.get('store').query('snp',{
            region: 'intergenic'
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
