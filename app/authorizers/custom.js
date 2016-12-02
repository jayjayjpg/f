import Base from 'ember-simple-auth/authorizers/base';
import Ember from 'ember';

export default Base.extend({
  session: Ember.inject.service(),

  authorize(data, block) {
    if (Ember.testing){
      block('Authorization', 'Bearer kimkardashian');
    }
    const { token } = data;
    if (this.get('session.isAuthenticated') && token){
      console.log("token for header: " + JSON.stringify(token));
      block('Authorization', `JWT ${token}`); // TODO: Check if Bearer should be substituted with "JWT"
    }
  }
});
