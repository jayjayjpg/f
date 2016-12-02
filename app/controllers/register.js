import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    userDidRegister(user){
      console.log("sending the useri ncontroller..." + user);
      let newUser = this.get('store').createRecord('user', user);
      newUser.save();
    }
  }
});
