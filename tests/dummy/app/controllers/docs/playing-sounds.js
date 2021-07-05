import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { timeout } from 'ember-concurrency';
import { task } from 'ember-concurrency';
export default class DocsUsageController extends Controller {
  // BEGIN-SNIPPET application-controller.js
  @service stereo;
  @service media;
  // END-SNIPPET


  // BEGIN-SNIPPET application-controller.js
  onDemandUrl = "https://audio.wnyc.org/otm/otm04212017pod.mp3"
  onDemandOgg = "https://file-examples-com.github.io/uploads/2017/11/file_example_OOG_1MG.ogg"

  streamUrl = "https://streaming.koop.org/stream.aac"

  // END-SNIPPET


  // BEGIN_SNIPPET play-sound-decorator-promise.js
  @task
  *loadAudioUrl() {
    yield timeout(200);
    return yield [this.onDemandUrl]
  }
  // END-SNIPPET


}
