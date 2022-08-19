import Service from '@ember/service';
import ENV from 'website-my/config/environment';
import mixpanel from 'mixpanel-browser';

export default class AnalyticsService extends Service {
  constructor() {
    super(...arguments);
    mixpanel.init(ENV.MIXPANEL_TOKEN);
  }

  trackEvent(event) {
    return mixpanel.track(event);
  }

  identifyUser() {
    return mixpanel.identify();
  }
}
