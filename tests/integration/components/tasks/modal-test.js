import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
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
});
