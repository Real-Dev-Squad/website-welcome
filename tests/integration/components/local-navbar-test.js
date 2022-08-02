import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | local-navbar', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    const navbarContent = 'Home | Profile | Tasks | Notifications | Identity';
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<LocalNavbar />`);

    assert.dom('.local-navbar').hasText(navbarContent);
  });
});
