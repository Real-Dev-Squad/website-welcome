import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { TEST_EVENT } from '../../constants/analytics';

module('Unit | Service | analytics', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const service = this.owner.lookup('service:analytics');
    assert.ok(service);
  });

  test('it returns the event passed in trackEvent service', function (assert) {
    const service = this.owner.lookup('service:analytics');
    const eventNameResult = TEST_EVENT;
    const eventName = service.trackEvent(TEST_EVENT).event;
    assert.equal(eventNameResult, eventName);
  });
});
