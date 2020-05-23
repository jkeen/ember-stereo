import AddonDocsRouter, { docsRoute } from 'ember-cli-addon-docs/router';
import config from './config/environment';

const Router = AddonDocsRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  docsRoute(this, function() {
    /* Your docs routes go here */
    this.route('usage')
  });
  this.route('diagnostic', function() {
    this.route('index')
    this.route('sync')
  });
  this.route('not-found', { path: '/*path' });
});

export default Router;
