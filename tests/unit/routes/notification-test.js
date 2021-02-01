import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | notification', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:notification');
    assert.ok(route);
  });
});
