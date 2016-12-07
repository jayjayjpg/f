import Ember from 'ember';
import RSVP from 'rsvp';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
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
