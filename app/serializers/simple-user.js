import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  serialize(snapshot, options){
    let json = this._super(...arguments);
    json.email = json.data.attributes.email;
    json.password = json.data.attributes.password;
    
    delete json.data;
    return json;
  }
});
