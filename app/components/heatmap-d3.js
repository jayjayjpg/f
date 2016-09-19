import Ember from 'ember';
import app from 'npm:biojs-vis-heatmap-d3';

export default Ember.Component.extend({
  classNames: ['heatmap-d3','facade-element'],
  init(){
    this._super(...arguments);
    console.log("parsed Data init heatmap: " + this.get('jsonData'));
    //this.renderHeatMap();
  },
  renderHeatMap (){
    //let parsedData = JSON.parse(this.get('jsonData'));
    let self = this;
    let parsedData = JSON.parse(JSON.stringify(this.get('jsonData').toArray()));

    let pursedData = [
    {"col":0,"row":0,"label":"M","score":17,"row_label":"A"},
    {"col":0,"row":1,"label":"M","score":5,"row_label":"C"},
    {"col":1,"row":0,"label":"M","score":43,"row_label":"D"},
    {"col":1,"row":1,"label":"M","score":58,"row_label":"E"}];

    self.set('parsedData', parsedData);
    console.log("this get parsedData parse: " + self.get('parsedData'));
    console.log("this get parsedData purse: " + pursedData);
    let heatmap = new app({
        jsonData: parsedData,
        user_defined_config: {
          colorLow: 'blue',
          colorMed: 'white',
          colorHigh: 'red',
          scoreLow: 10,
          scoreMid: 15,
          scoreHigh: 20,
          offset: 5
        },
        target: 'heatWrapper'
      });
    self.set('heatmap', heatmap);
  },
  pendingReq: function(){
    console.log("request is pending");
  }.property('parsedData.isPending'),
  updateData: Ember.computed('jsonData', function(){
    let heatmap = this.get('heatmap');
    heatmap.jsonData = this.get('jsonData');
    this.set('heatmap', heatmap);
  }),
  didInsertElement(){
    console.log("did insert heatmap/..");
    this.renderHeatMap();
  }
});
