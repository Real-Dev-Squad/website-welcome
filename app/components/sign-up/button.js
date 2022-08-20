import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { NEW_SIGNUP_FLOW } from '../../constants/analytics';

export default class ButtonComponent extends Component {
  @service analytics;

  @action
  buttonClickHandler() {
    const { state, clickHandler, disabled } = this.args;
    let event;

    switch (state) {
      case 'get-started':
        event = NEW_SIGNUP_FLOW.USER_GETTING_STARTED;
        !disabled ? clickHandler('firstName') : '';
        break;
      case 'firstName':
        event = NEW_SIGNUP_FLOW.USER_FIRST_NAME;
        !disabled ? clickHandler('lastName') : '';
        break;
      case 'lastName':
        event = NEW_SIGNUP_FLOW.USER_LAST_NAME;
        !disabled ? clickHandler('username') : '';
        break;
      case 'username':
        event = NEW_SIGNUP_FLOW.USER_USERNAME;
        !disabled ? clickHandler() : '';
        break;
      default:
        event = NEW_SIGNUP_FLOW.SOMETHING_WENT_WRONG;
        return;
    }

    this.analytics.trackEvent(event);
  }
}
