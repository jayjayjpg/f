import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  model(){
      /* return RSVP.hash({
        snps: this.get('store').query('snp',{
          region: 'missense'
        }),
        mutations: this.get('store').query('mutation',{
          rsId: 'rs2425019'
        })
      }); */
      return RSVP.hash({
          snps: this.get('store').query('snp',{
            region: 'missense'
          }),
          mutations: this.get('store').query('mutation',{
            rsId: 'rs2425019'
          })
        }).then(function(results){
           var filteredSnpIds = results.snps.mapBy('rsId');
           console.log("rsvp results: " + filteredSnpIds);
          /* return this.get('store').query('mutation', {
             rsId: filteredSnpIds.join(",")
           }) */
        });
  }
});
