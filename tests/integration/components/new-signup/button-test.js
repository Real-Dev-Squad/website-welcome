import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | new-signup/button', function (hooks) {
  setupRenderingTest(hooks);

  test('Button should be disabled if @disabled is true', async function (assert) {
    assert.expect(1);
    this.set('inputValue', 'Get Started');
    this.setProperties({
      onClick: function () {
        this.currentStep = this.SECOND_STEP;
      },
    });

    await render(hbs`
      <Button @onClick={{this.onClick}} @disabled={{true}}>{{inputValue}}</Button>
    `);

    assert.dom('[data-test-signup-button]').isDisabled();
  });

  test('Button should not be disabled if @disabled is undefined', async function (assert) {
    assert.expect(1);
    this.set('inputValue', 'Get Started');
    this.setProperties({
      onClick: function () {
        this.currentStep = this.SECOND_STEP;
      },
    });

    await render(hbs`
      <Button @onClick={{this.onClick}}>{{inputValue}}</Button>
    `);

    assert.dom('[data-test-signup-button]').isNotDisabled();
  });

  test('Button should not be disabled if @disabled is not true', async function (assert) {
    assert.expect(1);
    this.set('inputValue', 'Get Started');
    this.setProperties({
      onClick: function () {
        this.currentStep = this.SECOND_STEP;
      },
    });

    await render(hbs`
      <Button @onClick={{this.onClick}} @disabled={{false}}>{{inputValue}}</Button>
    `);

    assert.dom('[data-test-signup-button]').isNotDisabled();
  });

  test('Button should be of type button', async function (assert) {
    assert.expect(1);
    this.set('inputValue', 'Get Started');
    this.setProperties({
      onClick: function () {
        this.currentStep = this.SECOND_STEP;
      },
    });

    await render(hbs`
      <Button @onClick={{this.onClick}}>{{inputValue}}</Button>
    `);

    assert.dom('[data-test-signup-button]').hasAttribute('type', 'button');
  });

  test('Button should have spinner if @isLoading is true', async function (assert) {
    assert.expect(1);
    this.set('inputValue', 'Get Started');
    this.setProperties({
      onClick: function () {
        this.currentStep = this.SECOND_STEP;
      },
    });

    await render(hbs`
      <Button @onClick={{this.onClick}} @isLoading={{true}}>{{inputValue}}</Button>
    `);

    assert.dom('[data-test-signup-button-spinner]').exists();
  });

  test('Button should not have spinner if @isLoading is not true', async function (assert) {
    assert.expect(1);
    this.set('inputValue', 'Get Started');
    this.setProperties({
      onClick: function () {
        this.currentStep = this.SECOND_STEP;
      },
    });

    await render(hbs`
      <Button @onClick={{this.onClick}} @isLoading={{false}}>{{inputValue}}</Button>
    `);

    assert.dom('[data-test-signup-button-spinner]').doesNotExist();
  });
});
