import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | form-input', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Assemble
    await render(hbs`
      <FormInput />
    `);

    // Assert
    assert.dom('input').exists();
  });

  test('it shows the error', async function (assert) {
    // Assemble
    await render(hbs`
      <FormInput
        @errorMessage={{'SAMPLE ERROR'}}
        @required={{true}}
        @showError={{true}}
      />
    `);

    // Assert
    assert.dom('.error').exists();
  });
});
