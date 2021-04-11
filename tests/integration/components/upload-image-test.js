import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | upload-image', function (hooks) {
  setupRenderingTest(hooks);
  test('it renders', async function (assert) {
    // Set upload url
    this.set('uploadUrl', 'http://localhost:3000/test');
    this.set('formDataKeyName', 'profile');
    await render(
      hbs`<UploadImage @uploadUrl={{this.uploadUrl}}  @formKeyName = {{this.formDataKeyName}}/>`
    );
    assert.dom('.image-upload').exists();
    assert.dom('.image-upload').hasText('Drag and drop file here or Browse');
    assert
      .dom('.image-form__input')
      .hasProperty('type', 'file')
      .hasProperty('id', 'image')
      .hasProperty('accept', 'image/png, image/jpeg');
  });
});
