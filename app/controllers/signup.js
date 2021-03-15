import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action, set } from '@ember/object';
import ENV from 'website-my/config/environment';

const BASE_URL = ENV.BASE_API_URL;

export default class SignupController extends Controller {
  @tracked isSubmitDisabled = true;

  @tracked title = 'Account Details';
  @tracked formData = {
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    phone: '',
    yoe: '',
    company_name: '',
    designation: '',
    linkedin_id: '',
    instagram_id: '',
    twitter_id: '',
    website: '',
  };

  @tracked formErrors = {
    first_name: false,
    last_name: false,
    username: false,
    email: false,
    phone: false,
    yoe: false,
    company_name: false,
    designation: false,
    linkedin_id: false,
    instagram_id: false,
    twitter_id: false,
    website: false,
  };

  @tracked fields = [
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
      validator: this.userNameValidator,
      helpMsg: `Your username should start with your first name. Spaces are are not allowed but hyphens are. Example: If your name is John Doe, then your username can be 'john' or 'john-doe'`,
    },
    {
      id: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'lukespapa@gmail.com',
      errorMessage: 'Valid Email is required',
      required: true,
      showError: false,
      validator: this.emailValidator,
    },
    // {
    //   id: 'phone',
    //   label: 'Phone Number (Optional)',
    //   type: 'string',
    //   value: '+91-',
    //   errorMessage: 'Enter a valid phone number',
    //   required: false,
    //   showError: false,
    //   validator: this.phoneValidator,
    // },
    {
      id: 'yoe',
      label: 'Years of Experience',
      type: 'number',
      placeholder: 'How many years have you worked?',
      errorMessage: 'Number of years of experience is required',
      required: true,
      showError: false,
    },
    {
      id: 'company',
      label: 'Company Name / College Name (Optional)',
      type: 'text',
      placeholder: 'Where do you currently work? Death Star? Rebel Base?',
      errorMessage: '',
      required: false,
      showError: false,
    },
    {
      id: 'designation',
      label: 'Designation (Optional)',
      placeholder: 'Supreme Commander',
      type: 'text',
      errorMessage: '',
      required: false,
      showError: false,
    },
    {
      id: 'linkedin_id',
      label: 'LinkedIn ID (Not the full URL)',
      placeholder: 'anakin-skywalker-007 i.e just the ID part',
      type: 'text',
      errorMessage: 'LinkedIn username is required',
      required: true,
      showError: false,
    },
    {
      id: 'instagram_id',
      label: 'Instagram ID (Optional)',
      placeholder: 'ForceWielder77',
      type: 'text',
      errorMessage: '',
      required: false,
      showError: false,
    },
    {
      id: 'twitter_id',
      label: 'Twitter username (Not the full URL)',
      placeholder: 'anakin7',
      type: 'text',
      errorMessage: 'Twitter handle is required',
      required: true,
      showError: false,
    },
    {
      id: 'website',
      label: 'Website (Optional)',
      placeholder: 'Your portfolio website if any. e.g mysonisajedi.com',
      type: 'text',
      errorMessage: '',
      required: false,
      showError: false,
    },
  ];

  timerId = undefined;

  //Debounce Function
  debounce(func, delay) {
    clearTimeout(this.timerId);
    this.timerId = setTimeout(func, delay);
  }

  @action handleFieldChange(name, value) {
    const index = this.fields.findIndex((field) => field.id === name);
    set(this.formData, name, value);

    if (this.fields[index].required && !value) {
      this.isSubmitDisabled = true;
      set(this.fields[index], 'showError', true);
    } else if (!this.fields[index].validator) {
      set(this.fields[index], 'showError', false);
    }

    const anyErrors = this.fields.map((field) => {
      if (field.required && this.formData[field.id] === '') {
        return true;
      }
      return false;
    });

    if (anyErrors.filter(Boolean).length) {
      this.isSubmitDisabled = true;
    } else {
      this.isSubmitDisabled = false;
    }
  }

  async checkUserName(userName) {
    if (!userName) {
      return set(this.fields[2], 'errorMessage', 'Username cannot be empty');
    }
    try {
      const lowerCaseUsername = userName.toLowerCase();
      const response = await fetch(
        `${BASE_URL}/users/isUsernameAvailable/${lowerCaseUsername}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );
      const data = await response.json();
      const { isUsernameAvailable } = data;
      set(this.fields[2], 'showError', !isUsernameAvailable);
      set(
        this.fields[2],
        'errorMessage',
        `${userName} is not available, Choose another username!`
      );
    } catch (error) {
      console.error('Error : ', error);
    }
  }

  @action async userNameValidator(userName) {
    this.debounce(() => this.checkUserName(userName), 500);
  }

  @action phoneNumberValidator(phone) {
    if (typeof phone !== 'string') {
      return false;
    }

    const pattern = /^(0|[+91]{3})?[7-9][0-9]{9}$/;
    const index = this.fields.findIndex((field) => field.id === 'phone');

    if (pattern.test(phone)) {
      set(this.fields[index], 'showError', false);
    } else {
      set(this.fields[index], 'showError', true);
    }
  }

  @action emailValidator(email) {
    if (typeof email !== 'string') return false;

    const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const index = this.fields.findIndex((field) => field.type === 'email');

    if (pattern.test(email)) {
      set(this.fields[index], 'showError', false);
    } else {
      set(this.fields[index], 'showError', true);
    }
    return;
  }

  removeEmptyFields(reqObject) {
    for (const field in reqObject) {
      if (!reqObject[field]) {
        delete reqObject[field];
      }
    }
    return reqObject;
  }

  @action async handleSubmit(e) {
    // submit
    // https://github.com/Real-Dev-Squad/website-api-contracts/tree/main/users#patch-usersself
    e.preventDefault();
    const cleanReqObject = this.removeEmptyFields(this.formData);
    cleanReqObject.username = cleanReqObject.username.toLowerCase();
    try {
      const response = await fetch(`${BASE_URL}/users/self`, {
        method: 'PATCH',
        body: JSON.stringify(cleanReqObject),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const { status } = response;
      if (status === 204) {
        window.open('https://realdevsquad.com/goto', '_self');
      } else {
        alert('Something went wrong. Please check console errors.');
      }
    } catch (error) {
      console.error('Error : ', error);
    } finally {
      this.isSubmitClicked = false;
    }
  }
}
