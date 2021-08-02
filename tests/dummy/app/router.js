import AddonDocsRouter, { docsRoute } from 'ember-cli-addon-docs/router';
import config from './config/environment';

export default class Router extends AddonDocsRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  docsRoute(this, function() {
    /* Your docs routes go here */
    this.route('install')
    this.route('configuration')
    this.route('upgrading')

    this.route('usage')
    this.route('autoplay')
    this.route('playing-sounds');
    this.route('trying-multiple-formats');
    this.route('metadata');
    this.route('error-handling');
    this.route('event-monitoring');
    this.route('volume');
  });

  this.route('diagnostic', function() {
    this.route('index')
    this.route('sync')
  });

  this.route('autoplay-test');
  this.route('not-found', { path: '/*path' });
});
