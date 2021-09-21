import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class ButtonComponent extends Component {
  @action
  buttonClickHandler() {
    const { state, clickHandler, disabled } = this.args;

    switch (state) {
      case 'get-started':
        !disabled ? clickHandler('firstName') : '';
        break;
      case 'firstName':
        !disabled ? clickHandler('lastName') : '';
        break;
      case 'lastName':
        !disabled ? clickHandler('username') : '';
        break;
      case 'username':
        !disabled ? clickHandler() : '';
        break;
      default:
        return;
    }
  }
}
