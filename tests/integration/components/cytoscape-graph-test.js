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

  // Template block usage:
  this.render(hbs`
    {{#cytoscape-graph}}
      template block text
    {{/cytoscape-graph}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
