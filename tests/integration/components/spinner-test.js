import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | spinner', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<Spinner />`);
    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      <Spinner>
        template block text
      </Spinner>
    `);
    assert.equal(this.element.textContent.trim(), '');
    assert.dom('.fa').exists();
    assert.dom('.fa').hasNoText();
    assert.dom('.fa-spinner').exists();
    assert.dom('.fa-spin').exists();
  });
});
