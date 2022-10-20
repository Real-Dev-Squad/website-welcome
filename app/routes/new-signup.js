import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ENV from 'website-my/config/environment';
import { SIGNUP } from '../constants/analytics';
import {
  AUTH_URL,
  ERROR_MESSAGES,
  GOTO_URL,
  REDIRECT_TEXT,
} from '../constants/signup';
export default class NewSignupRoute extends Route {
  @service analytics;

  async model() {
    try {
      this.analytics.trackEvent(SIGNUP.PAGE_LOADED);
      const response = await fetch(`${ENV.BASE_API_URL}/users/self`, {
        credentials: 'include',
      });
      const userData = await response.json();
      if (response.status === 401) {
        alert(REDIRECT_TEXT.loggedIn);
        window.open(AUTH_URL, '_self');
      }
      if (response.status === 200 && !userData.incompleteUserDetails) {
        this.analytics.trackEvent(SIGNUP.USER_ALREADY_REGISTERED);
        alert(REDIRECT_TEXT.formAlreadyFilled);
        window.open(GOTO_URL, '_self');
      }
    } catch {
      alert(ERROR_MESSAGES.unknown);
    }
  }
}
