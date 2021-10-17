import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | signup', function (hooks) {
  setupTest(hooks);
  test('it test', function (assert) {
    let controller = this.owner.lookup('controller:signup');
    assert.expect(46);
    assert.equal(
      controller.isSubmitClicked,
      false,
      'initially isSubmitClicked is false'
    );
    assert.equal(
      controller.isButtonDisabled,
      true,
      'initially isButtonDisabled is true'
    );
    assert.equal(
      controller.state,
      'get-started',
      'initially state is get-started'
    );
    assert.equal(controller.dev, false, 'initially dev is false');
    assert.equal(
      controller.errorMessage,
      null,
      'initially errorMessage is null'
    );
    assert.equal(
      controller.title,
      'Account Details',
      'initially title is Account Details'
    );
    assert.equal(
      controller.timerId,
      undefined,
      'initially timerId is undefined'
    );

    const formElements = [
      {
        id: 'first_name',
        label: 'First Name',
        type: 'text',
        placeholder: 'Darth',
        errorMessage: 'First name is required',
        required: true,
        showError: false,
      },
      {
        id: 'last_name',
        label: 'Last Name',
        type: 'text',
        placeholder: 'Vader',
        errorMessage: 'Last name is required',
        required: true,
        showError: false,
      },
      {
        id: 'username',
        label: 'Username for Real Dev Squad',
        type: 'text',
        placeholder: 'e.g anakin, or some other unique username',
        errorMessage: 'Username is required',
        required: true,
        showError: false,
      },
    ];

    formElements.map((ele) =>
      assert.equal(
        controller.formData[ele.id],
        '',
        `initially formData.${ele.id} is ''`
      )
    );
    formElements.map((ele) =>
      assert.equal(
        controller.formErrors[ele.id],
        false,
        `initially formErrors.${ele.id} is false`
      )
    );

    formElements.map((ele, index) => {
      assert.equal(
        controller.fields[index].id,
        ele.id,
        `initially field ${index} id is ${ele.id}`
      );
      assert.equal(
        controller.fields[index].label,
        ele.label,
        `initially field ${index} label is ${ele.label}`
      );
      assert.equal(
        controller.fields[index].placeholder,
        ele.placeholder,
        `initially field ${index} placeholder is ${ele.placeholder}`
      );
      assert.equal(
        controller.fields[index].type,
        ele.type,
        `initially field ${index} type is ${ele.type}`
      );
      assert.equal(
        controller.fields[index].errorMessage,
        ele.errorMessage,
        `initially field ${index} errorMessage is ${ele.errorMessage}`
      );
      assert.equal(
        controller.fields[index].required,
        ele.required,
        `initially field ${index} required is ${ele.required}`
      );
      assert.equal(
        controller.fields[index].showError,
        ele.showError,
        `initially field ${index} showError is ${ele.showError}`
      );
    });

    controller.send('handleFieldChange', 'first_name', 'John');
    assert.equal(controller.formData.first_name, 'John', 'first name set');
    assert.equal(controller.fields[0].showError, false, 'show Error is false');

    controller.send('handleFieldChange', 'first_name', '');
    assert.equal(controller.formData.first_name, '', 'first name set');
    assert.equal(controller.fields[0].showError, true, 'show Error is true');

    controller.send('handleFieldChange', 'last_name', 'Mathew');
    assert.equal(controller.formData.last_name, 'Mathew', 'last name set');
    assert.equal(controller.fields[1].showError, false, 'show Error is false');

    controller.send('handleFieldChange', 'last_name', '');
    assert.equal(controller.formData.last_name, '', 'last name set');
    assert.equal(controller.fields[1].showError, true, 'show Error is true');

    controller.send('handleFieldChange', 'username', 'John123');
    assert.equal(controller.formData.username, 'John123', 'username set');
    assert.equal(controller.fields[2].showError, false, 'show Error is false');

    controller.send('handleFieldChange', 'username', '');
    assert.equal(controller.formData.username, '', 'username set');
    assert.equal(controller.fields[2].showError, true, 'show Error is true');
  });
});
