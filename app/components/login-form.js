import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'form',
  classNames: ['facade-element','login-form'],
  loginSent: false,
  user: Ember.computed('identification', 'password', function(){
    let user = this.getProperties('identification', 'password');
    return user;
  }),
  formComplete: Ember.computed.and('emailOk','passwordOk'),
  emailOk: Ember.computed.notEmpty('identification'),
  passwordOk: Ember.computed.notEmpty('password'),
  actions: {
    loginConfirm(){
      let user = this.get('user');
      this.set('loginSent', true);
      this.get('onSubmit')(user);
    }
  }
});
