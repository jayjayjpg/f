import Ember from 'ember';
import jheatmap from 'npm:jheatmap';

export default Ember.Component.extend({
  classNames:  ['facade-element', 'j-heatmap'],
  init(){
    this._super(...arguments);
    console.log("heatmap: " + JSON.stringify(jheatmap));

  },
  didInsertElement(){
    console.log("this jheatmap: " + this.$('#heatmap').text());

      var values =  new jheatmap.readers.MatrixHeatmapReader({ url: '/api/interactions.tsv' });
      console.log(values);
  }
});
