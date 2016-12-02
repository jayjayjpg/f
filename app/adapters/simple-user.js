import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  namespace: 'auth',
  pathForType: function(type){
    return "login";
  },
  headers: {
    'Content-Type': 'application/json'
  }
});
