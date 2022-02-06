import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | tasks', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Tasks />`);

    assert.ok(this.element.textContent.trim().includes('Tasks'));

    // Template block usage:
    await render(hbs`
      <Tasks>
        template block text
      </Tasks>
    `);

    assert.ok(this.element.textContent.trim().includes('Tasks'));
  });
});
