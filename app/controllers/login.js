import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    userDidLogin(user){
      let userRecord = this.get('store').createRecord('simple-user', user);
      userRecord.save();
    }
  }
});
