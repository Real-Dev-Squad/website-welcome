import Route from '@ember/routing/route';

export default class NotificationsRoute extends Route {
    async model() {
        let response = await fetch('/api/notification.json');
        let parsed = await response.json();
        return parsed.data;
      }
}
