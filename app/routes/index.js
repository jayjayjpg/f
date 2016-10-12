import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  model(){
    var indexData = RSVP.hash({ 
        mutations: this.get('store').query('mutation', {
            rsId: 'rs2425019,rs6088765'
        }).then(function(snps){
          return snps;
        }),
        snps: this.get('store').query('snp', {
            region: 'missense'
        }).then(function(snps){
          this.get('store').query('mutation', {
              rsId:  // give back snp ids
          }).then(function(filteredSnps){
            return filteredSnps; // TODO: first query all the snps with a specific region and then use rsIds to query the mutation data
          })
        })
    });
    return indexData;
  }
});
