import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | profile', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:profile');
    assert.ok(controller);
    assert.equal(
      controller.imageUploadUrl,
      'https://api.realdevsquad.com/users/picture',
      'Profile picture upload endpoint'
    );
    assert.equal(
      controller.formDataKeyName,
      'profile',
      'Formdata key name for accessing at backend'
    );
  });
});
