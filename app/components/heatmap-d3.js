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
  currentHasMut: Ember.computed.bool('currentMut'),
  mutatedClass: Ember.computed('currentHasMut', function(){
    if (this.get('currentHasMut') === true){
      return "mutated";
    }
  }),
  currentMut: null,
  currentPatient: null,
  currentSnp: null,
  elementInfo: function(d, i){
    let data =  this.get('elementInfo');
    let patient = d.x;
    let snp = d.y;
    let mut = d.value;
    this.set('currentMut', mut);
    this.set('currentSnp', snp);
    this.set('currentPatient', patient);
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
    let newHeatMap = heatmap.heatmapModule({target: '#heatWrapper', data: parsedData, clickHandler: this.get('elementInfo').bind(this) });
  }
});
