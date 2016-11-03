import Ember from 'ember';
import heatmap from '../utils/heatmap-module';

export default Ember.Component.extend({
  classNames: ['heatmap-d3','facade-element'],
  cnt: 0,
  svgRatio: null,
  heatMap: Ember.computed('jsonData.@each', function(){
    return this.$('#heatmapInstance');
  }),
  init(){
    this._super(...arguments);

  },
  renderHeatMap: function(){
    console.log("RERUN renderHeatMap");
    let data = this.get('jsonData');

    let sortedData = JSON.parse(JSON.stringify(this.get('jsonData').sortBy('x')));
    heatmap.update([]);
    let svgRatio = heatmap.update(sortedData);
    this.set('svgRatio', svgRatio);

  }.observes('jsonData'),
  didInsertElement(){
    let parsedData = JSON.parse(JSON.stringify(this.get('jsonData').toArray()));
    let newHeatMap = heatmap.heatmapModule({target: '#heatWrapper', data: parsedData });
  }
});
