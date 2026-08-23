import AddonDocsRouter, { docsRoute } from 'ember-cli-addon-docs/router';
import config from 'docs/config/environment';

export default class Router extends AddonDocsRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  docsRoute(this, function () {
    /* Your docs routes go here */
    this.route('install');
    this.route('upgrading');

    this.route('usage');
    this.route('playing-sounds');
    this.route('browser-audio');
    this.route('metadata');
    this.route('event-monitoring');
    this.route('casting');

    // Retired pages, kept so their urls still land somewhere.
    this.route('autoplay');
    this.route('audio-format');
    this.route('error-handling');
    this.route('waiting-for-sounds');
    this.route('volume');
    this.route('advanced');
    this.route('testing');
    this.route('debugging');
  });

  this.route('diagnostic', function () {
    this.route('index');
    this.route('sync');
    this.route('players');
  });

  this.route('autoplay-test');
  this.route('not-found', { path: '/*path' });
});
