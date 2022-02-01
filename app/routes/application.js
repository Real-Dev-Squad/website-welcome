import Route from '@ember/routing/route';
import ENV from 'website-my/config/environment';

const API_BASE_URL = ENV.BASE_API_URL;
export default class ApplicationRoute extends Route {
  model = async () => {
    const defaultName = 'User';
    const defaultPicture = 'dummyProfilePicture.png';

    try {
      const response = await fetch(`${API_BASE_URL}/users/self`, {
        credentials: 'include',
      });
      const userData = await response.json();
      if (response.status === 200 && !userData.incompleteUserDetails) {
        const firstName = userData?.first_name || defaultName;
        const profilePictureURL = userData?.picture.url || defaultPicture;
        return { firstName, profilePictureURL };
      } else if (response.status === 401) {
        alert('You are not logged in. Please login to continue.');
        window.open(
          'https://github.com/login/oauth/authorize?client_id=23c78f66ab7964e5ef97',
          '_self'
        );
      }
    } catch (error) {
      console.error(error.message);
      alert('API Fetch Request failed');
    }
  };
}
