import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
//import mutations from './testdata/mutations';

moduleForComponent('heatmap-d3', 'Integration | Component | heatmap d3', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  //let jsonData = mutations;
  this.set('jsonData', []);

  this.render(hbs`{{heatmap-d3}}`);

  assert.ok(this.$().hasClass('heatmap-d3'), 'has class heatmap-d3');

  // Template block usage:
});
