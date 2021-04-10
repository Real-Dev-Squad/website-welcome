import Controller from '@ember/controller';
import ENV from 'website-my/config/environment';
const BASE_URL = ENV.BASE_API_URL;

export default class UploadImageController extends Controller {
  imageUploadUrl = `${BASE_URL}/users/picture`;
}
