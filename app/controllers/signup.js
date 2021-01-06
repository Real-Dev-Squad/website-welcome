import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action, set } from '@ember/object';

export default class SignupController extends Controller {
  @tracked isSubmitDisabled = true
  @tracked title = 'Account Details'
  @tracked formData = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phoneNumber: '',
    experience: '',
    companyName: '',
    designation: '',
    github: '',
    linkedIn: '',
    twitter: '',
  };

  @tracked formErrors = {
    firstName: false,
    lastName: false,
    username: false,
    email: false,
    phoneNumber: false,
    experience: false,
    companyName: false,
    designation: false,
    github: false,
    linkedIn: false,
    twitter: false,
  };

  @tracked fields = [
    {
      id: 'firstName',
      label: 'First Name',
      type: 'text',
      errorMessage: 'First name is required',
      required: true,
      showError: false
    },
    {
      id: 'lastName',
      label: 'Last Name',
      type: 'text',
      errorMessage: 'Last name is required',
      required: true,
      showError: false
    },
    {
      id: 'username',
      label: 'Choose a username',
      type: 'text',
      errorMessage: 'Username is required',
      required: true,
      showError: false
    },
    {
      id: 'email',
      label: 'Email',
      type: 'email',
      errorMessage: 'Valid Email is required',
      required: true,
      showError: false,
      validator: this.emailValidator
    },
    {
      id: 'phoneNumber',
      label: 'Phone Number',
      type: 'string',
      value: '+91-',
      errorMessage: 'Enter a valid phone number',
      required: false,
      showError: false,
      validator: this.phoneNumberValidator
    },
    {
      id: 'experience',
      label: 'Experience',
      type: 'number',
      errorMessage: 'Number of experience is required',
      required: true,
      showError: false
    },
    {
      id: 'companyName',
      label: 'Company Name ',
      type: 'text',
      errorMessage: '',
      required: false,
      showError: false
    },
    {
      id: 'designation',
      label: 'Designation ',
      type: 'text',
      errorMessage: '',
      required: false,
      showError: false
    },
    {
      id: 'github',
      label: 'Github ',
      type: 'text',
      errorMessage: 'GitHub username is required',
      required: true,
      showError: false
    },
    {
      id: 'linkedIn',
      label: 'LinkedIn ',
      type: 'text',
      errorMessage: 'LinkedIn username is required',
      required: true,
      showError: false
    },
    {
      id: 'twitter',
      label: 'Twitter ',
      type: 'text',
      errorMessage: 'Twitter handle is required',
      required: true,
      showError: false
    },
    {
      id: 'website',
      label: 'Website ',
      type: 'text',
      errorMessage: '',
      required: false,
      showError: false
    },
  ]

  @action handleFieldChange(name, value) {
    const index = this.fields.findIndex(field => field.id === name)
    
    set(this.formData, name, value)
    
    if (this.fields[index].required && !value) {
      this.isSubmitDisabled = true
      return set(this.fields[index], 'showError', true)
    } else if (!this.fields[index].validator) {
      return set(this.fields[index], 'showError', false)
    }

    const anyErrors = this.fields.reduce((prev, field) => {
      if (prev) {
        return prev
      }
      if (field.required && this.formData[field.id] === '') {
        return true
      }
      return false
    }, false)

    if (anyErrors) {
      this.isSubmitDisabled = true
    }
  }

  @action phoneNumberValidator(phoneNumber) {
    if (typeof phoneNumber !== 'string'){ return false }

    const pattern=/^(0|[+91]{3})?[7-9][0-9]{9}$/;
    const index = this.fields.findIndex((field) => field.id === 'phoneNumber')

    if (pattern.test(phoneNumber)) {
      set(this.fields[index], 'showError', false);
    } else {
      set(this.fields[index], 'showError', true);
    }
  }

  @action emailValidator(email) {
    if (typeof email !== 'string') return false;
    
    const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const index = this.fields.findIndex((field) => field.type === 'email')

    if (pattern.test(email)) {
      set(this.fields[index], 'showError', false);
    } else {
      set(this.fields[index], 'showError', true);
    }
  }

  @action handleSubmit() {
    // submit
  }
}
