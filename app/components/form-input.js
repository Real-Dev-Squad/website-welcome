import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class FormInputComponent extends Component {
  @action
  inputFieldChanged(event) {
    const { id, onChange, validator } = this.args;
    const value = event.target.value;

    if (validator) {
      validator(value);
    }
    onChange(id, value, validator);
  }
}
