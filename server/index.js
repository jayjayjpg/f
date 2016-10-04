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
  const execFile = require('child_process').execFile;
  const jsonFromExcel = require('../server/createjsonfromexcel');
  const formatJson = require('../server/createjson');
  const mainEmitter = formatJson.mEvents;
  var mocks      = globSync('./mocks/**/*.js', { cwd: __dirname }).map(require);
  var proxies    = globSync('./proxies/**/*.js', { cwd: __dirname }).map(require);

  // Log proxy requests
  var morgan  = require('morgan');
  app.use(morgan('dev'));

  app.get('/api/mutations', function(req, res) {
    /*const preprocessData = execFile('./createjsonfromexcel.js', (error, stdout, stderr) => {
      if (error){
        throw error;
      }
      console.log(stdout);
    });*/
    mainEmitter.on('hola', () => {
      const json = JSON.parse(fs.readFileSync('server/data/excelmod.json'));
      res.header("Content-Type","application/vnd.api+json"); 
      res.send(json);
    });
    jsonFromExcel.create(formatJson.create);
   // formatJson.create();

  });

  app.get('/api/interactions', function(req,res) {
    const inst = fs.readFileSync('server/data/interactions.tsv');
    res.send(inst);
  });
  
  

  mocks.forEach(function(route) { route(app); });
  proxies.forEach(function(route) { route(app); });

};
