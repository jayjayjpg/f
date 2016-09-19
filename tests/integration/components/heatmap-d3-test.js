import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('heatmap-d3', 'Integration | Component | heatmap d3', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{heatmap-d3}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#heatmap-d3}}
      template block text
    {{/heatmap-d3}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
