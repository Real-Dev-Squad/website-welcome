import Controller from '@ember/controller';
import { action, set } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import registerUser from '../utils/register-api';

export default class SignupController extends Controller {
  queryParams = ['state'];

  @tracked isSubmitClicked = false;
  @tracked isButtonDisabled = true;

  @tracked state = null;
  @tracked userDetails = {
    firstName: '',
    lastName: '',
    username: '',
  };
  @tracked errorMessage;

  @action changeRouteParams(paramValue) {
    if (paramValue)
      this.transitionToRoute({ queryParams: { state: paramValue } });
  }

  @action handleInputChange(key, value) {
    set(this.userDetails, key, value);

    if (this.userDetails[key] > '') this.isButtonDisabled = false;
    else this.isButtonDisabled = true;
  }

  @action registerUser() {
    const user = {
      first_name: this.userDetails.firstName,
      last_name: this.userDetails.lastName,
      username: this.userDetails.username,
    };
    this.isSubmitClicked = true;

    registerUser(user)
      .then((res) => {
        if (res.status === 204) {
          window.open('https://realdevsquad.com/goto', '_self');
        } else {
          res.json().then((res) => {
            this.errorMessage = res.errors[0].title;
          });
        }
      })
      .catch((err) => (this.errorMessage = err))
      .finally(() => {
        this.isSubmitClicked = false;
      });
  }
}
