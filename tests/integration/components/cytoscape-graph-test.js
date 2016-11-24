import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('cytoscape-graph', 'Integration | Component | cytoscape graph', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{cytoscape-graph}}`);

  assert.equal(this.$().text().trim(), '');
  assert.ok(this.$('.facade-element.cytoscape-graph').length > 0, 'facade component is created');

});

test('it displays the canvas and reflects data', function(assert){
  let cytoInteractions = {"nodes":[{"data":{"id":"hsa-miR-135a-3p","label":""},"classes":"node cy-node"},{"data":{"id":"DUSP16","label":"rs11054935"},"classes":"node cy-node"},{"data":{"id":"hsa-miR-615-3p","label":""},"classes":"node cy-node"},{"data":{"id":"CCDC26","label":"rs13277237"},"classes":"node cy-node"},{"data":{"id":"hsa-miR-539-5p","label":""},"classes":"node cy-node"},{"data":{"id":"PRKCB","label":"rs7404095"},"classes":"node cy-node"}],"edges":[{"data":{"id":"hsa-miR-135a-3pDUSP16","weight":1,"source":"hsa-miR-135a-3p","target":"DUSP16"}},{"data":{"id":"hsa-miR-615-3pCCDC26","weight":1,"source":"hsa-miR-615-3p","target":"CCDC26"}},{"data":{"id":"hsa-miR-539-5pPRKCB","weight":1,"source":"hsa-miR-539-5p","target":"PRKCB"}}]};
  this.set('elementData', cytoInteractions);
  // Load with data
  this.render(hbs`{{cytoscape-graph}}`);

  assert.ok(this.$('canvas').length ===  3, 'renders canvas');
});
