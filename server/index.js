/*jshint node:true*/

// To use it create some files under `mocks/`
// e.g. `server/mocks/ember-hamsters.js`
//
// module.exports = function(app) {
//   app.get('/ember-hamsters', function(req, res) {
//     res.send('hello');
//   });
// };
const fs = require('fs');

module.exports = function(app) {
  var globSync   = require('glob').sync;
  var mocks      = globSync('./mocks/**/*.js', { cwd: __dirname }).map(require);
  var proxies    = globSync('./proxies/**/*.js', { cwd: __dirname }).map(require);

  // Log proxy requests
  var morgan  = require('morgan');
  app.use(morgan('dev'));

  app.get('/api/mutations', function(req, res) {
    const json = JSON.parse(fs.readFileSync('server/data/mutationmod.json'));
    res.header("Content-Type","application/vnd.api+json"); 
    res.send(json);
  });

  mocks.forEach(function(route) { route(app); });
  proxies.forEach(function(route) { route(app); });

};
