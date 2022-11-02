import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | tasks/modal', function (hooks) {
  setupRenderingTest(hooks);

  test('modal is visible if showModal is true', async function (assert) {
    this.setProperties({
      goBack: () => {},
      markComplete: () => {},
      markCompleteAndAssignTask: () => {},
      showModal: true,
    });
    await render(hbs`
      <Task::Modal 
        @goBack={{this.goBack}}
        @markComplete={{this.markComplete}}
        @showModal={{this.showModal}}
        @markCompleteAndAssignTask{{this.markCompleteAndAssignTask}}
      />
    `);

    assert.dom('.modal').exists();
    assert.dom('.close').exists();
    assert.dom('.close').hasProperty('button');
  });

  test('modal should not exist if the showModal is false', async function (assert) {
    this.setProperties({
      goBack: () => {},
      markComplete: () => {},
      markCompleteAndAssignTask: () => {},
      showModal: false,
    });
    await render(hbs`
      <Task::Modal 
        @goBack={{this.goBack}}
        @markComplete={{this.markComplete}}
        @markCompleteAndAssignTask={{this.markCompleteAndAssignTask}}
        @message={{this.message}}
        @showModal={{this.showModal}}
      />
    `);

    assert.dom('.modal').doesNotExist();
    assert.dom('.close').doesNotExist();
  });

  test('two buttons should exist if buttonRequired is set to true', async function (assert) {
    this.setProperties({
      goBack: () => {},
      isUpdating: false,
      markComplete: () => {},
      markCompleteAndAssignTask: () => {},
      showModal: true,
      buttonRequired: true,
    });

    await render(hbs`
      <Task::Modal 
        @goBack={{this.goBack}}
        @markComplete={{this.markComplete}}
        @markCompleteAndAssignTask={{this.markCompleteAndAssignTask}}
        @message={{this.message}}
        @showModal={{this.showModal}}
        @buttonRequired={{this.buttonRequired}}
        @isUpdating={{this.isUpdating}}
      />
    `);

    assert.dom('[data-test-modal]').exists();
    assert.dom('[data-test-closeBtn]').exists();
    assert.dom('[data-test-closeBtn]').hasProperty('button');
    assert.dom('[data-test-notAssignBtn]').exists();
    assert.dom('[data-test-notAssignBtn]').hasProperty('button');
    assert.dom('[data-test-assignBtn]').exists();
    assert.dom('[data-test-assignBtn]').hasProperty('button');
  });

  test('the message should change to updating task when the user clicks on `do not assign task` button, and a loader should also show up, and the buttons should be removed', async function (assert) {
    this.setProperties({
      goBack: () => {},
      isUpdating: false,
      markComplete: () => {
        this.set('buttonRequired', false);
        this.set('message', 'updating task');
        this.set('isUpdating', true);
      },
      markCompleteAndAssignTask: () => {},
      showModal: true,
      buttonRequired: true,
    });

    await render(hbs`
      <Task::Modal 
        @goBack={{this.goBack}}
        @markComplete={{this.markComplete}}
        @markCompleteAndAssignTask={{this.markCompleteAndAssignTask}}
        @message={{this.message}}
        @showModal={{this.showModal}}
        @buttonRequired={{this.buttonRequired}}
        @isUpdating={{this.isUpdating}}
      />
    `);

    await click('[data-test-notAssignBtn]');

    assert.dom('[data-test-spinner]').exists();
    assert.dom('[data-test-notAssignBtn]').doesNotExist();
    assert.dom('[data-test-assignBtn]').doesNotExist();
    assert.equal(
      this.element.querySelector('.modal-title').textContent,
      'updating task'
    );

    this.set('isUpdating', false);
    assert.dom('[data-test-spinner]').doesNotExist();
  });

  test('the message should change to updating task when the user clicks `assign task` button, and a loader should also show up, and the buttons should be removed', async function (assert) {
    this.setProperties({
      goBack: () => {},
      isUpdating: false,
      markComplete: () => {},
      markCompleteAndAssignTask: () => {
        this.set('buttonRequired', false);
        this.set('message', 'updating task');
        this.set('isUpdating', true);
      },
      showModal: true,
      buttonRequired: true,
    });

    await render(hbs`
      <Task::Modal 
        @goBack={{this.goBack}}
        @markComplete={{this.markComplete}}
        @markCompleteAndAssignTask={{this.markCompleteAndAssignTask}}
        @message={{this.message}}
        @showModal={{this.showModal}}
        @buttonRequired={{this.buttonRequired}}
        @isUpdating={{this.isUpdating}}
      />
    `);

    await click('[data-test-assignBtn]');

    assert.dom('[data-test-spinner]').exists();
    assert.equal(
      this.element.querySelector('.modal-title').textContent,
      'updating task'
    );

    assert.dom('[data-test-notAssignBtn]').doesNotExist();
    assert.dom('[data-test-assignBtn]').doesNotExist();

    this.set('isUpdating', false);
    assert.dom('[data-test-spinner]').doesNotExist();
    // removing the button
  });
});
