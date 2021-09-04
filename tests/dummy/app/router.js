import AddonDocsRouter, { docsRoute } from 'ember-cli-addon-docs/router';
import config from './config/environment';

export default class Router extends AddonDocsRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  docsRoute(this, function () {
    /* Your docs routes go here */
    this.route('install')
    this.route('overview')
    this.route('upgrading')

    this.route('usage')
    this.route('autoplay')
    this.route('playing-sounds');
    this.route('audio-format');
    this.route('metadata');
    this.route('error-handling');
    this.route('event-monitoring');
    this.route('waiting-for-sounds');
    this.route('volume');
    this.route('testing');
  });

  this.route('diagnostic', function () {
    this.route('index')
    this.route('sync')
  });

  this.route('autoplay-test');
  this.route('not-found', { path: '/*path' });

});
