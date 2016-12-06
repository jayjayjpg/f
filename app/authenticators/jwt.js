import Ember from 'ember';
import BaseAuthenticator from 'ember-simple-auth/authenticators/base';
import config from '../config/environment';

const { RSVP: { Promise }, $: { ajax }, run } = Ember;

export default BaseAuthenticator.extend({
  tokenEndpoint: `${config.host}/auth/login`,

  restore(data) {
    return new Promise((resolve, reject) => {
      if (!Ember.isEmpty(data.token)){
        resolve(data);
      }
      else {
        reject();
      }
    });
  },

  authenticate(creds) {
    const { identification, password } = creds;
    const data = JSON.stringify({
        email: identification,
        password
    });

    const requestOptions = {
      url: this.tokenEndpoint,
      type: 'POST',
      data,
      contentType: 'application/json',
      dataType: 'json'
    };

    return new Promise((resolve, reject) => {
      ajax(requestOptions).then((response) => {
        const { token } = response;

        run(()=>{
          resolve({
            token: token
          });
        });
      }, (error) => {
        run(() => {
          reject(error);
        });
      });
    });
  },

  invalidate(data) {
    return Promise.resolve(data);
  }
});
