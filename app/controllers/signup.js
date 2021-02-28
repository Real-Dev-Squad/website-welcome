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
      label: 'Username for Real Dev Squad',
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
      id: 'phone',
      label: 'Phone Number',
      type: 'string',
      value: '+91-',
      errorMessage: 'Enter a valid phone number',
      required: false,
      showError: false,
      validator: this.phoneValidator,
    },
    {
      id: 'yoe',
      label: 'Years of Experience',
      type: 'number',
      errorMessage: 'Number of years of experience is required',
      required: true,
      showError: false,
    },
    {
      id: 'company_name',
      label: 'Company Name / College Name',
      type: 'text',
      errorMessage: '',
      required: false,
      showError: false,
    },
    {
      id: 'designation',
      label: 'Designation',
      type: 'text',
      errorMessage: '',
      required: false,
      showError: false,
    },
    {
      id: 'linkedin_id',
      label: 'LinkedIn ID (Not the full URL)',
      type: 'text',
      errorMessage: 'LinkedIn username is required',
      required: true,
      showError: false,
    },
    {
      id: 'instagram_id',
      label: 'Instagram ID',
      type: 'text',
      errorMessage: '',
      required: false,
      showError: false,
    },
    {
      id: 'twitter_id',
      label: 'Twitter username (Not the full URL)',
      type: 'text',
      errorMessage: 'Twitter handle is required',
      required: true,
      showError: false,
    },
    {
      id: 'website',
      label: 'Website (Optional)',
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

  @action async handleSubmit(e) {
    // submit
    // https://github.com/Real-Dev-Squad/website-api-contracts/tree/main/users#patch-usersself
    e.preventDefault();
    let reqBody = this.formData;
    if (!this.formData.website) {
      delete this.formData.website;
    }
    try {
      const response = await fetch(`${BASE_URL}/users/self`, {
        method: 'PATCH',
        body: JSON.stringify(reqBody),
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
    }
  }
}
