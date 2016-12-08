/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'facade',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    contentSecurityPolicy: {
      'connect-src' : "'self' http://localhost:4500"
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {  
      ENV.host = 'http://localhost:4100';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.host = 'https://facade-backend.herokuapp.com';
  }

  ENV['ember-simple-auth'] = {  
      authorizer: 'authorizer:custom',
      authenticationRoute: 'login',
      routeAfterAuthentication: 'mutations',
      routeIfAlreadyAuthenticated: 'mutations'
  };

  return ENV;
};
