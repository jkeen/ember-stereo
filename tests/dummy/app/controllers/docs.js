import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
export default class DocsController extends Controller {
  @service media;
  @service stereo;
}
