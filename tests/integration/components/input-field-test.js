import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import fillIn from '@ember/test-helpers/dom/fill-in';

module('Integration | Component | input-field', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Assemble
    await render(hbs`
      <InputField />
    `);

    // Assert
    assert.dom('input').exists();
  });

  test('it shows the error', async function (assert) {
    // Assemble
    await render(hbs`
      <InputField
        @errorMessage={{'SAMPLE ERROR'}}
        @required={{true}}
        @showError={{true}}
      />
    `);

    // Assert
    assert.dom('.error').exists();
  });

  test('it returns the right type of input entered for number', async function (assert) {
    // Assemble
    const NUMBER_TYPE = 'number';
    const NUMBER_INPUT = 12345;

    this.set('NUMBER_TYPE', NUMBER_TYPE);

    // Assemble
    this.set('onChange', (inputValue) => {
      this.set('inputValue', inputValue);

      if (typeof inputValue !== NUMBER_TYPE) {
        assert.step('Wrong Type');
      }
    });

    await render(hbs`
      <InputField
        @type={{NUMBER_TYPE}}
        @value={{this.inputValue}}
        @onChange={{this.onChange}}
      />
    `);

    // Act
    await fillIn('input', NUMBER_INPUT);

    // Assert
    assert.verifySteps([]);
  });

  test('it returns the right type of input entered for string', async function (assert) {
    const STRING_TYPE = 'string';
    const STRING_INPUT = '12345';

    this.set('STRING_TYPE', STRING_TYPE);

    // Assemble
    this.set('onChange', (inputValue) => {
      this.set('inputValue', inputValue);

      if (typeof inputValue !== STRING_TYPE) {
        assert.step('Wrong Type');
      }
    });

    await render(hbs`
      <InputField
        @type={{STRING_TYPE}}
        @value={{this.inputValue}}
        @onChange={{this.onChange}}
      />
    `);

    // Act
    await fillIn('input', STRING_INPUT);

    // Assert
    assert.verifySteps([]);
  });
});
