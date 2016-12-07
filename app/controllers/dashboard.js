import Ember from 'ember';
import config from '../config/environment';


export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  actions: {
    seedData(){
        this.get('session').authorize('authorizer:custom', (headerName, headerValue) => {
          let headerNameString = headerName.toString();
          let token = this.get('session.data.authenticated.token');
          Ember.$.ajax({
              type: "GET",
              url: `${config.host}/api/v1/seed`,
              headers: {
                'Authorization' : headerValue
              }
          }).success(function(returnData) {
              console.log("you did it!" + returnData);
          }); 
        });
    },
    authorizeUsers(){
      console.log("authorize users...");
    }
  }
});
