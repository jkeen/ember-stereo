import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class DocsCurrentBrowser extends Component {
  @service userAgent

  get oppositeBrowser() {
    if (this.userAgent.get('browser.isChrome')) {
      return "Safari or Firefox"
    } else if (this.userAgent.get('browser.isFirefox')) {
      return "Safari"
    } else if (this.userAgent.get('browser.isEdge')) {
      return "Firefox"
    } else if (this.userAgent.get('browser.isSafari')) {
      return "Firefox"
    } else {
      return "your browser"
    }
  }
}
