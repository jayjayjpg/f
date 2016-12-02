import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  serialize(snapshot, options){
    let json = this._super(...arguments);
    json.email = json.data.attributes.email;
    json.password = json.data.attributes.password;
    
    delete json.data;
    return json;
  },
  normalizeResponse(res){
    let json = { };
    if (res.error ){
      throw err;
    }
    json.data = {};
    json.data.attributes = res;
    //console.log("normalized res: " + JSON.stringify(res));
    return json;
  }
});
