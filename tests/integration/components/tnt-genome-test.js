import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tnt-genome', 'Integration | Component | tnt genome', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{tnt-genome}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tnt-genome}}
      template block text
    {{/tnt-genome}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
