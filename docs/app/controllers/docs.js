import Controller from '@ember/controller';
import { service } from '@ember/service';
export default class DocsController extends Controller {
  @service media;
  @service stereo;
}
