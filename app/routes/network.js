import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  model(params){
    if (params.rsId == null){
      return RSVP.hash({
        snps: this.store.query('snp', params),
        interactions: this.store.findAll('interaction')
      });
    }
    else {
      return RSVP.hash({
        snps: this.store.query('snp', params),
        interactions: this.store.query('interaction', {
          rsId: params.rsId
        })
      });
    }
  },
  didTransition(){
   // this.$('.collapsible').collapsible();
  }
});
