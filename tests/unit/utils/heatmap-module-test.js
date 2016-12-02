import heatmap from 'facade/utils/heatmap-module';
import { module, test } from 'qunit';

module('Unit | Utility | heatmap module');

// Replace this with your real tests.
test('it works', function(assert) {
  let exportedModules = Object.keys(heatmap);
  assert.equal(exportedModules.length, 2, '2 modules exported from heatmap util');
});
