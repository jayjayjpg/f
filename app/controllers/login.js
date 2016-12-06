import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  actions: {
    authenticate(user){
      let credentials = user,
      authenticator = 'authenticator:jwt';
      this.get('session')
          .authenticate(authenticator, credentials)
          .catch((reason) => {
            this.set('errorMessage', reason.error || reason);
          });
    }
  }
});
