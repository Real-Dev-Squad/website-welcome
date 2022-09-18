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
      showModal: true,
    });
    await render(hbs`
      <Task::Modal 
        @goBack={{this.goBack}}
        @markComplete={{this.markComplete}}
        @showModal={{this.showModal}}
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
      showModal: false,
    });
    await render(hbs`
      <Task::Modal 
        @goBack={{this.goBack}}
        @markComplete={{this.markComplete}}
        @message={{this.message}}
        @showModal={{this.showModal}}
      />
    `);

    assert.dom('.modal').doesNotExist();
    assert.dom('.close').doesNotExist();
  });

  test('button should exist if buttonRequired is set to true', async function (assert) {
    this.setProperties({
      goBack: () => {},
      markComplete: () => {},
      showModal: true,
      buttonRequired: true,
    });
    await render(hbs`
      <Task::Modal 
        @goBack={{this.goBack}}
        @markComplete={{this.markComplete}}
        @message={{this.message}}
        @showModal={{this.showModal}}
        @buttonRequired={{this.buttonRequired}}
      />
    `);

    assert.dom('.modal').exists();
    assert.dom('.close').exists();
    assert.dom('.close').hasProperty('button');
    assert.dom('.proceed-btn').exists();
    assert.dom('.proceed-btn').hasProperty('button');
  });
});
