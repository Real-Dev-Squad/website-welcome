import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

// handler functions are creating some problems need to fix em
module('Integration | Component | new-sign-up/form', function (hooks) {
  setupRenderingTest(hooks);

  test('it has a first name when current step is firstStep', async function (assert) {
    assert.expect(1);

    this.setProperties({
      onClick: function () {
        this.currentStep = this.THIRD_STEP;
      },
      currentStep: 'firstName',
    });

    await render(hbs`
      <NewSignup::Input
        @onClick={{this.onClick}} 
        @currentStep={{this.currentStep}}
      />`);

    assert
      .dom('[data-test-signup-form-label]')
      .hasText('What is your first name?');
  });

  test('it has a lastname label when current step is lastName', async function (assert) {
    assert.expect(1);

    this.setProperties({
      onClick: function () {
        this.currentStep = this.FOURTH_STEP;
      },
      currentStep: 'lastName',
    });

    await render(hbs`
      <NewSignup::Input
        @onClick={{this.onClick}} 
        @currentStep={{this.currentStep}}
      />`);

    assert
      .dom('[data-test-signup-form-label]')
      .hasText('And what is your last name?');
  });

  test('it has a username label when current step is username', async function (assert) {
    assert.expect(1);

    this.setProperties({
      onClick: function () {
        this.currentStep = this.FIFTH_STEP;
      },
      currentStep: 'username',
    });

    await render(hbs`
      <NewSignup::Input
        @onClick={{this.onClick}} 
        @currentStep={{this.currentStep}}
      />`);

    assert
      .dom('[data-test-signup-form-label]')
      .hasText('Now choose your awesome username!');
  });

  test('It should have button with text', async function (assert) {
    assert.expect(2);
    this.setProperties({
      onClick: function () {
        this.currentStep = this.THIRD_STEP;
      },
      currentStep: 'firstName',
    });
    await render(hbs`
      <NewSignup::Input
        @onClick={{this.onClick}} 
        @currentStep={{this.currentStep}}
      />`);

    assert.dom('[data-test-signup-button]').exists();
    assert.dom('[data-test-signup-button]').hasAnyText();
  });

  test('button should have text Submit if the current step is username', async function (assert) {
    assert.expect(2);
    this.setProperties({
      onClick: function () {
        this.currentStep = this.LAST_STEP;
      },
      currentStep: 'username',
    });

    await render(hbs`
      <NewSignup::Input
        @onClick={{this.onClick}} 
        @currentStep={{this.currentStep}}
      />`);

    assert.dom('[data-test-signup-button]').exists();
    assert.dom('[data-test-signup-button]').hasText('Submit');
  });

  test('It should have input field', async function (assert) {
    assert.expect(3);

    this.setProperties({
      onClick: function () {
        this.currentStep = this.THIRD_STEP;
      },
      currentStep: 'firstName',
    });

    await render(hbs`
      <NewSignup::Input
        @onClick={{this.onClick}} 
        @currentStep={{this.currentStep}}
      />`);

    assert.dom('[data-test-signup-form-input]').exists();
    assert
      .dom('[data-test-signup-form-input]')
      .hasProperty('type', 'text')
      .hasAttribute('placeholder');
  });
});
