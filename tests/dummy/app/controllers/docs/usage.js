import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { timeout } from 'ember-concurrency';
import { task } from 'ember-concurrency-decorators';
export default class DocsUsageController extends Controller {
  // BEGIN-SNIPPET application-controller.js
  @service hifi;
  // END-SNIPPET

  // BEGIN_SNIPPET hifi-play-decorator-promise.js
  @task
  * loadAudioUrl() {
    // yield timeout(200);
    return yield ["https://stream.wqxr.org/wqxr"]
  }
  // END-SNIPPET


}
