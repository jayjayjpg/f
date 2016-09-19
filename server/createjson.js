const fs = require('fs');
const input = require('./data/newmutations.json');

var resArr = input.map(function(mut, i){
  mut.attributes = {};
  for (var prop in mut){
    if (mut[prop] !== mut.attributes){
          mut.attributes[prop] = mut[prop];
      delete mut[prop];
    }
  }
  mut.type = "mutation";
  mut.id =  i;
  return mut;
});

var smArray = resArr;
console.log("new mut object: " + JSON.stringify(resArr[0]));
var resultJSON = JSON.stringify({
  "data": smArray
});
fs.writeFile("./data/mutationmod.json", resultJSON, function(err){
  if (err) {
    return console.log(err);
  }
  console.log("File successfully saved: " + "./data/mutationmod.json");
});


