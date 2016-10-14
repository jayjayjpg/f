import Ember from 'ember';
//import app from 'npm:biojs-vis-heatmap-d3';
import app from '../utils/heatmap-module';

/* export default Ember.Component.extend({
  classNames: ['heatmap-d3','facade-element'],
  init(){
    this._super(...arguments);
   // console.log("parsed Data init heatmap: " + this.get('jsonData'));
    //this.renderHeatMap();
  },
  renderHeatMap: function(){
    //let parsedData = JSON.parse(this.get('jsonData'));
    let self = this;
    let parsedData = JSON.parse(JSON.stringify(this.get('jsonData').toArray()));

    self.set('parsedData', parsedData);

    let heatmap = new app({
        jsonData: parsedData,
        user_defined_config: {
          colorLow: '#555',
          colorMed: 'white',
          colorHigh: '#f72222',
          scoreLow: 0,
          scoreMid: 0.5,
          scoreHigh: 1,
          offset: 5
        },
        target: 'heatWrapper'
      });
    self.set('heatmap', heatmap);
  }.on('didInsertElement'), // nice try on the component rerender on model change
  pendingReq: function(){
    console.log("request is pending");
  }.property('parsedData.isPending'),
  updateData: function(){
    console.log("heatmap CP: updateData");
    let heatmap = this.get('heatmap');
    heatmap.jsonData = this.get('jsonData');
    this.set('heatmap', heatmap);
  }.observes('jsonData')
}); */

export default Ember.Component.extend({
  classNames: ['heatmap-d3','facade-element'],
  init(){
    this._super(...arguments);
    console.log("init custom heatmap.");
  },
  renderHeatMap: function(){
    var data = this.get('jsonData');
    console.log("jsonData loaded: " + data[0]);
    let parsedData = JSON.parse(JSON.stringify(this.get('jsonData').toArray())); // TODO: check which input order displays data with correct value - label mapping 
    app({target: '#heatWrapper', data: parsedData });
  }.on('didInsertElement')
});
