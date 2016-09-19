import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('vertical-bar-chart', 'Integration | Component | vertical bar chart', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{vertical-bar-chart}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#vertical-bar-chart}}
      template block text
    {{/vertical-bar-chart}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
