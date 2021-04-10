import EmberRouter from '@ember/routing/router';
import config from 'website-my/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('signup');
  this.route('notifications');
  this.route('upload-image');
});
