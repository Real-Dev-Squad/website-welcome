import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import ENV from 'website-my/config/environment';

const BASE_URL = ENV.BASE_API_URL;

export default class IdentityController extends Controller {
  @tracked isEditClicked = false;
  @tracked isGenerateChaincodeClicked = false;
  @tracked isChecked = false;
  @tracked isChaincodeClicked = false;
  @tracked Chaincode = 'Generate Chaincode';
  @tracked isCopyClicked = false;
  @tracked isVerifyClicked = false;
  @tracked profileURL = this.model.profileURL || '';
  @tracked saveDisabled = true;
  @tracked generateChainCodeDisabled = this.model.profileURL === undefined;
  @tracked checkboxDisabled =
    this.generateChainCodeDisabled || this.model.chaincode === undefined;

  @action async handleRefresh() {
    window.location.reload();
  }

  @action changeSaveDisabled() {
    const isValidUrl = (urlString) => {
      try {
        return Boolean(new URL(urlString));
      } catch (e) {
        return false;
      }
    };
    if (
      this.profileURL === '' ||
      this.profileURL === (this.model.profileURL || '') ||
      !isValidUrl(this.profileURL)
    ) {
      this.saveDisabled = true;
    } else {
      this.saveDisabled = false;
    }
  }

  @action handleCopy() {
    navigator.clipboard.writeText(this.Chaincode);
    this.isCopyClicked = true;
    if (this.isCopyClicked === true) {
      alert('Copied');
      this.checkboxDisabled = false;
    }
  }

  @action async handleEdit(e) {
    e.preventDefault();

    if (this.isEditClicked === false) {
      this.isEditClicked = true;

      try {
        const response = await fetch(`${BASE_URL}/users/profileURL`, {
          method: 'PATCH',
          body: JSON.stringify({ profileURL: this.profileURL }),
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        if (response.ok) {
          alert('Updated profile URL!!');
          this.generateChainCodeDisabled = false;
        } else {
          alert('Something went wrong. Please check console errors.');
        }
      } catch (error) {
        console.error('Something went wrong. Please check console errors.');
      } finally {
        this.isEditClicked = false;
      }
    }
  }

  @action async handleGenerateChaincode(e) {
    e.preventDefault();
    if (this.isGenerateChaincodeClicked === false) {
      this.isGenerateChaincodeClicked = true;

      try {
        const response = await fetch(`${BASE_URL}/users/chaincode`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        const { chaincode } = await response.json();

        if (response.ok) {
          this.Chaincode = chaincode;
          this.isChaincodeClicked = true;
          alert('Generated New Chaincode!!');
        } else {
          alert('Something went wrong. Please check console errors.');
        }
      } catch (error) {
        alert('Something went wrong. Please check console errors.');
      } finally {
        this.isGenerateChaincodeClicked = false;
      }
    }
  }

  @action async handleVerify(e) {
    e.preventDefault();

    if (this.isChecked === false) {
      alert('Please verify!');
    } else if (this.isVerifyClicked === false) {
      this.isVerifyClicked = true;

      try {
        const response = await fetch(`${BASE_URL}/users/verify`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (response.ok) {
          alert('Your request has been queued successfully');
          window.location.reload();
        } else {
          alert('Something went wrong. Please check console errors.');
        }
      } catch (error) {
        alert('Something went wrong. Please check console errors.');
      } finally {
        this.isVerifyClicked = false;
      }
    }
  }
}
