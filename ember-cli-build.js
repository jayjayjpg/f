/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var nodeSass = require('node-sass'); // loads the version in your package.json

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
    sassOptions: {
      includePaths: [
        'bower_components/materialize/sass'
      ],
      nodeSass: nodeSass // Workaround for ember-cli-sass bug https://github.com/aexmachina/ember-cli-sass/issues/117
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.
  //app.import('vendor/tnt.genome.css');
  // app.import('vendor/d3.js');
  app.import('bower_components/d3/d3.js', {
    destDir: 'assets'
  });
 /* app.import('vendor/shims/d3-legacy.js', {
    exports: {
      'd3v3':[
        'default'
      ]
    }
  });  */
  // app.import('vendor/heatmap-d3.js');
  /* app.import('bower_components/d3/d3.js', {
    exports: {
      'd3v4':[
        'default'
      ]
    },
    destDir: 'sassets'
  }); */ 
 



  return app.toTree();
};
