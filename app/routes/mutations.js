import Ember from 'ember';
import RSVP from 'rsvp';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  session: Ember.inject.service('session'),
  queryParams: {
    regionType: {
      refreshModel: true
    }
  },
  model(param){
      var self = this;
      if (param.regionType == null){
        return RSVP.hash({
          snps: this.get('store').findAll('snp'),
          mutations: this.get('store').findAll('mutation')
        }); 
      }
      // can now filter for SNPs with different region types
      return RSVP.hash({
          snps: this.get('store').findAll('snp'),
          filteredSnps: this.get('store').query('snp',{
            region: param.regionType 
          })
        }).then(function(results){
           var filteredSnpIds = results.filteredSnps.mapBy('rsId').join(",");
           return RSVP.hash({
              snps: self.get('store').peekAll('snp'),
              filteredSnps: results.filteredSnps,
              mutations: self.get('store').query('mutation',{
                rsId: filteredSnpIds
              })
           });
        });
  },
  actions: {
    refreshRoute(){
      this.refresh(); // TODO: force reload / requery of the modelby action or a transition hook?
    },
    myModelReload(model){
      this.refresh();
    }
  }
});
