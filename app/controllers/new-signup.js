import Controller from '@ember/controller';
import { action, set } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import registerUser from '../utils/register-api';
import { GOTO_URL } from '../constants/signup';
import { NEW_SIGNUP_FLOW } from '../constants/analytics';
import { ERROR_MESSAGES, NEW_SIGNUP_STEPS } from '../constants/new-signup';
import checkUserName from '../utils/check-username';

export default class NewSignUpController extends Controller {
  @service analytics;

  queryParams = ['currentStep'];

  @tracked isLoading = false;
  @tracked isButtonDisabled = true;
  @tracked error = '';
  @tracked currentStep = NEW_SIGNUP_STEPS[0];
  FIRST_STEP = NEW_SIGNUP_STEPS[0];
  SECOND_STEP = NEW_SIGNUP_STEPS[1];
  THIRD_STEP = NEW_SIGNUP_STEPS[2];
  FOURTH_STEP = NEW_SIGNUP_STEPS[3];
  LAST_STEP = NEW_SIGNUP_STEPS[4];

  @tracked signupDetails = {
    firstName: '',
    lastName: '',
    username: '',
  };

  @action changeStepToTwo() {
    this.currentStep = this.SECOND_STEP;
    this.analytics.trackEvent(NEW_SIGNUP_FLOW.USER_GETTING_STARTED);
  }

  @action changeStepToThree() {
    this.currentStep = this.THIRD_STEP;
    this.analytics.trackEvent(NEW_SIGNUP_FLOW.USER_FIRST_NAME);
    this.isButtonDisabled = true;
  }

  @action changeStepToFour() {
    this.currentStep = this.FOURTH_STEP;
    this.analytics.trackEvent(NEW_SIGNUP_FLOW.USER_LAST_NAME);
    this.isButtonDisabled = true;
  }

  @action register() {
    this.analytics.trackEvent(NEW_SIGNUP_FLOW.USER_USERNAME);
    this.isButtonDisabled = true;
    this.signup();
  }

  @action completeSignUp() {
    this.analytics.trackEvent(NEW_SIGNUP_FLOW.NEW_SIGNUP_FLOW_DONE);
    window.open(GOTO_URL, '_self');
  }

  @action handleInputChange(key, value) {
    this.error = '';
    set(this.signupDetails, key, value);
    if (this.signupDetails[key] > '') this.isButtonDisabled = false;
    else this.isButtonDisabled = true;
  }

  @action async signup() {
    const signupDetails = {
      first_name: this.signupDetails.firstName,
      last_name: this.signupDetails.lastName,
      username: this.signupDetails.username,
    };
    this.isLoading = true;

    const isUsernameAvailable = await checkUserName(signupDetails.username);
    if (!isUsernameAvailable) {
      this.analytics.trackEvent(NEW_SIGNUP_FLOW.USERNAME_NOT_AVAILABLE);
      this.isLoading = false;
      this.isButtonDisabled = false;
      return (this.error = ERROR_MESSAGES.userName);
    }

    registerUser(signupDetails)
      .then((res) => {
        if (res.status === 204) {
          this.analytics.identifyUser();
          this.analytics.trackEvent(NEW_SIGNUP_FLOW.USER_REGISTERED);
          this.currentStep = this.LAST_STEP;
        } else {
          this.analytics.trackEvent(NEW_SIGNUP_FLOW.UNABLE_TO_SIGNUP);
          this.error = ERROR_MESSAGES.others;
          this.isButtonDisabled = false;
        }
      })
      .catch(() => {
        this.analytics.trackEvent(NEW_SIGNUP_FLOW.UNABLE_TO_REGISTER);
        this.error = ERROR_MESSAGES.others;
        this.isButtonDisabled = false;
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}
