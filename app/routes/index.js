import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    var mutations = this.get('store').query('mutation', {
        rsId: 'rs2425019'
    }).then(function(snps){
      return snps;
    });
    return mutations;
  }
});
