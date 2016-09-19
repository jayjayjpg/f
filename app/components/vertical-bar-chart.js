import Ember from 'ember';
// import d3 from 'd3';
//import imporverticalBarChart from 'npm:biojs-vis-vertical-bar-chart';

export default Ember.Component.extend({
  classNames: ['vertical-bar-chart'],
  tagName: 'biojs-vis-vertical-bar-chart',
  data: "[4,4,4]",
  init(){
    this._super(...arguments);
    this.initializeChart();
  },
  initializeChart(){
    let d3 = d3;
    console.log("d3 loaded: " + this.get('d3').version);
    console.log("init vertical-bar-chart");
  },
  didInsertElement(){
    this.$().setData("[30,25,10,12]"); 
  }
});
