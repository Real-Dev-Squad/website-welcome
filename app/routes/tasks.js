import Route from '@ember/routing/route';
import ENV from 'website-my/config/environment';

const API_BASE_URL = ENV.BASE_API_URL;

export default class TasksRoute extends Route {
  model = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/self`, {
        credentials: 'include',
      });
      if (!response.ok) {
        if (response.status == 401) {
          throw new Error('Please log in to continue');
        }
        throw new Error('Oops, We ran into a problem!');
      }
      return await response.json();
    } catch (error) {
      alert(error);
      window.open(
        'https://github.com/login?client_id=23c78f66ab7964e5ef97&return_to=%2Flogin%2Foauth%2Fauthorize%3Fclient_id%3D23c78f66ab7964e5ef97',
        '_self'
      );
    }
  };
}
