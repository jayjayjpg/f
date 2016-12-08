import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'form',
  classNames: ['facade-element','registration-form'],
  registrationSent: false,
  user: Ember.computed('firstName', 'familyName', 'emailAddress', 'passwordOk', function(){
    let user = {
      firstName: this.get('firstName'),
      lastName: this.get('familyName'),
      email: this.get('emailAddress'),
      password: this.get('password')
    };
    return user;
  }),
  formComplete: Ember.computed.and('firstNameOk', 'familyNameOk','emailOk','passwordOk'),
  firstNameOk: Ember.computed.notEmpty('firstName'),
  familyNameOk: Ember.computed.notEmpty('familyName'),
  emailOk: Ember.computed.notEmpty('emailAddress'),
  passwordOk: Ember.computed.notEmpty('password'),
  actions: {
    submitConfirm(){
      let user = this.get('user');
      this.set('registrationSent', true);
      this.get('onSubmit')(user);
    }
  }
});
