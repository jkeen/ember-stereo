import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class DocsCurrentBrowser extends Component {
  @service userAgent;

  get browserName() {
    if (this.userAgent.get('browser.isChrome')) {
      return 'Chrome';
    } else if (this.userAgent.get('browser.isFirefox')) {
      return 'Firefox';
    } else if (this.userAgent.get('browser.isEdge')) {
      return 'Edge';
    } else if (this.userAgent.get('browser.isSafari')) {
      return 'Safari';
    } else {
      return 'your browser';
    }
  }
}
