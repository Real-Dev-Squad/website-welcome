import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action, set } from '@ember/object';
import HistoryLocation from '@ember/routing/history-location';

const BASE_URL = 'https://staging-api.realdevsquad.com';

export default class SignupController extends Controller {
  @tracked isSubmitDisabled = true;
  @tracked title = 'Account Details';
  @tracked formData = {
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    phone_number: '',
    yoe: '',
    company_name: '',
    designation: '',
    github_id: '',
    linkedin_id: '',
    twitter_id: '',
  };

  @tracked formErrors = {
    first_name: false,
    last_name: false,
    username: false,
    email: false,
    phone_number: false,
    yoe: false,
    company_name: false,
    designation: false,
    github_id: false,
    linkedin_id: false,
    twitter_id: false,
  };

  @tracked fields = [
    {
      id: 'first_name',
      label: 'First Name',
      type: 'text',
      errorMessage: 'First name is required',
      required: true,
      showError: false,
    },
    {
      id: 'last_name',
      label: 'Last Name',
      type: 'text',
      errorMessage: 'Last name is required',
      required: true,
      showError: false,
    },
    {
      id: 'username',
      label: 'Choose a username',
      type: 'text',
      errorMessage: 'Username is required',
      required: true,
      showError: false,
    },
    {
      id: 'email',
      label: 'Email',
      type: 'email',
      errorMessage: 'Valid Email is required',
      required: true,
      showError: false,
      validator: this.emailValidator,
    },
    {
      id: 'phone_number',
      label: 'Phone Number',
      type: 'string',
      value: '+91-',
      errorMessage: 'Enter a valid phone number',
      required: false,
      showError: false,
      validator: this.phone_numberValidator,
    },
    {
      id: 'yoe',
      label: 'yoe',
      type: 'number',
      errorMessage: 'Number of years of experience is required',
      required: true,
      showError: false,
    },
    {
      id: 'company_name',
      label: 'Company Name / College Name ',
      type: 'text',
      errorMessage: '',
      required: false,
      showError: false,
    },
    {
      id: 'designation',
      label: 'Designation ',
      type: 'text',
      errorMessage: '',
      required: false,
      showError: false,
    },
    {
      id: 'github_id',
      label: 'Github_id ',
      type: 'text',
      errorMessage: 'GitHub username is required',
      required: true,
      showError: false,
    },
    {
      id: 'linkedin_id',
      label: 'linkedin_id ',
      type: 'text',
      errorMessage: 'linkedIn username is required',
      required: true,
      showError: false,
    },
    {
      id: 'twitter_id',
      label: 'twitter_id ',
      type: 'text',
      errorMessage: 'Twitter handle is required',
      required: true,
      showError: false,
    },
    {
      id: 'website',
      label: 'Website ',
      type: 'text',
      errorMessage: '',
      required: false,
      showError: false,
    },
  ];

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

  @action phoneNumberValidator(phone_number) {
    if (typeof phone_number !== 'string') {
      return false;
    }

    const pattern = /^(0|[+91]{3})?[7-9][0-9]{9}$/;
    const index = this.fields.findIndex((field) => field.id === 'phone_number');

    if (pattern.test(phone_number)) {
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

  @action async handleSubmit(e) {
    // submit
    // https://github.com/Real-Dev-Squad/website-api-contracts/tree/main/users#patch-usersself
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/users/self`, {
        method: 'PATCH',
        body: JSON.stringify(this.formData),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      const { statusCode } = data;
      if (statusCode === 204) {
        return window.open('https://www.realdevsquad.com/goto', '_self');
      }
      alert('Something went wrong');
    } catch (error) {
      console.log('Error : ', error);
    }
  }
}
