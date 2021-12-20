import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class InputFieldComponent extends Component {
  @action handleInputFieldChange(event) {
    let inputValue;
    const { type, onChange } = this.args;
    const { value } = event.target;

    switch (type) {
      case 'string':
        inputValue = value;
        break;
      case 'number':
        inputValue = Number(value);
        break;
      case 'boolean':
        inputValue = Boolean(value);
        break;
      default:
        inputValue = value;
        console.warn('Unknown type detected! Keeping the value as string');
    }

    onChange(inputValue);
  }
}
