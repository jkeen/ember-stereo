import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class DocsCurrentBrowser extends Component {
  @service userAgent;

  get osName() {
    if (this.userAgent.get('os.isAndroid')) {
      return 'Android';
    } else if (this.userAgent.get('os.isIOS')) {
      return 'iOS';
    } else if (this.userAgent.get('os.isLinux')) {
      return 'Linux';
    } else if (this.userAgent.get('os.isMacOS')) {
      return 'Mac';
    } else if (this.userAgent.get('os.isWindows')) {
      return 'Windows';
    } else {
      return "(whatever OS you're running)";
    }
  }
}
