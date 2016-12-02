import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  serialize(snapshot, options) {
    var json = this._super(...arguments);
    /* json.firstName = json.data.attributes["first-name"];
    json.lastName = json.data.attributes["last-name"];
    json.email = json.data.attributes.email;
    json.password = json.data.attributes.password;
    // json.aloha = "updated adapter";
    
    // let newJson = `firstName=${json.firstName}&lastName=${json.lastName}&email=${json.email}&password=${json.password}`;

    delete json.data.attributes.firstName;
    delete json.data.attributes.lastName;
    delete json.data.attributes.email;
    delete json.data.attributes.password;
    delete json.data;  */

    var str = [];
    for(var p in json){
      if (json.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
      }
    }
    let newJson = str.join("&");

    return json;
  }
});
