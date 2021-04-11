import Controller from '@ember/controller';
import ENV from 'website-my/config/environment';
const BASE_URL = ENV.BASE_API_URL;

export default class ProfileController extends Controller {
  formDataKeyName = 'profile';

  get imageUploadUrl() {
    return `${BASE_URL}/users/picture`;
  }
}
