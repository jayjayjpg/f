import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'form',
  classNames: ['facade-element','login-form'],
  loginSent: false,
  user: Ember.computed('emailAddress', 'password', function(){
    let user = {
      email: this.get('emailAddress'),
      password: this.get('password')
    };
    return user;
  }),
  formComplete: Ember.computed.and('emailOk','passwordOk'),
  emailOk: Ember.computed.notEmpty('emailAddress'),
  passwordOk: Ember.computed.notEmpty('password'),
  emailAddress: 'me@jessicajordan.de',
  password: 'superpassword',
  actions: {
    loginConfirm(){
      let user = this.get('user');
      this.set('loginSent', true);
      this.get('onSubmit')(user);
    }
  }
});
