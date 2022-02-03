import Controller from '@ember/controller';
import ENV from 'website-my/config/environment';
import { tracked } from '@glimmer/tracking';
import { action, set } from '@ember/object';
const BASE_URL = ENV.BASE_API_URL;

export default class ProfileController extends Controller {
  queryParams = ['dev'];

  @tracked dev = false;

  formDataKeyName = 'profile';

  get imageUploadUrl() {
    return `${BASE_URL}/users/picture`;
  }

  @tracked isSubmitDisabled = true;
  @tracked isSubmitClicked = false;

  @tracked title = 'Account Details';
  @tracked formData = {
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    phone: '',
    yoe: 0,
    company: '',
    designation: '',
    linkedin_id: '',
    instagram_id: '',
    twitter_id: '',
    website: '',
  };

  formErrors = {
    first_name: false,
    last_name: false,
    username: false,
    email: false,
    phone: false,
    yoe: false,
    company: false,
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
      showError: false,
      disabled: true,
    },
    {
      id: 'last_name',
      label: 'Last Name',
      type: 'text',
      placeholder: 'Vader',
      showError: false,
      disabled: true,
    },
    {
      id: 'username',
      label: 'Username for Real Dev Squad',
      type: 'text',
      placeholder: 'e.g anakin, or some other unique username',
      showError: false,
      disabled: true,
    },
    {
      id: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'lukespapa@gmail.com',
      showError: false,
      validator: this.emailValidator,
      disabled: false,
    },
    {
      id: 'yoe',
      label: 'Years of Experience',
      type: 'number',
      placeholder: 'How many years have you worked?',
      showError: false,
      disabled: false,
    },
    {
      id: 'company',
      label: 'Company Name / College Name',
      type: 'text',
      placeholder: 'Where do you currently work? Death Star? Rebel Base?',
      showError: false,
      disabled: false,
    },
    {
      id: 'designation',
      label: 'Designation',
      placeholder: 'Supreme Commander',
      type: 'text',
      showError: false,
      disabled: false,
    },
    {
      id: 'linkedin_id',
      label: 'LinkedIn ID (Not the full URL)',
      placeholder: 'anakin-skywalker-007 i.e just the ID part',
      type: 'text',
      showError: false,
      disabled: false,
    },
    {
      id: 'instagram_id',
      label: 'Instagram ID',
      placeholder: 'ForceWielder77',
      type: 'text',
      showError: false,
      disabled: false,
    },
    {
      id: 'twitter_id',
      label: 'Twitter username (Not the full URL)',
      placeholder: 'anakin7',
      type: 'text',
      showError: false,
      disabled: false,
    },
    {
      id: 'website',
      label: 'Website',
      placeholder: 'Your portfolio website if any. e.g mysonisajedi.com',
      type: 'text',
      showError: false,
      disabled: false,
    },
  ];

  timerId = undefined;

  @action handleFieldChange(name, value) {
    const index = this.fields.findIndex((field) => field.id === name);
    set(this.formData, name, value);

    if (!value) {
      this.isSubmitDisabled = true;
      set(this.fields[index], 'showError', true);
    } else if (!this.fields[index].validator) {
      set(this.fields[index], 'showError', false);
    }

    const anyErrors = this.fields.map((field) => {
      return !!(this.formData[field.id] === '');
    });

    this.isSubmitDisabled = !anyErrors.filter(Boolean).length;
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
    const objectRequested = reqObject;
    for (const field in objectRequested) {
      if (!objectRequested[field]) {
        delete objectRequested[field];
      } else if (field === 'yoe') {
        objectRequested[field] = parseInt(objectRequested[field]);
      }
    }
    return objectRequested;
  }

  @action async handleSubmit(e) {
    // submit
    // https://github.com/Real-Dev-Squad/website-api-contracts/tree/main/users#patch-usersself
    e.preventDefault();
    const cleanReqObject = this.removeEmptyFields(this.formData);
    this.isSubmitClicked = true;
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
      if (status !== 204) {
        alert('Something went wrong. Please check console errors.');
      }
    } catch (error) {
      console.error('Error : ', error);
    } finally {
      this.isSubmitClicked = false;
    }
  }
}
