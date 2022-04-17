import Route from '@ember/routing/route';
import ENV from 'website-my/config/environment';

export default class IdentityRoute extends Route {
  async model() {
    try {
      const response = await fetch(`${ENV.BASE_API_URL}/users/self`, {
        credentials: 'include',
      });
      const userData = await response.json();
      if (response.status === 401) {
        throw new Error('You are not logged in. Please login to continue.');
      }
      return userData;
    } catch (error) {
      console.error(error.message);
      alert(error);
      window.open(
        'https://github.com/login/oauth/authorize?client_id=23c78f66ab7964e5ef97',
        '_blank'
      );
    }
  }
}
