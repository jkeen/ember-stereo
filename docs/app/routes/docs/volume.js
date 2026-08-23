import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class DocsVolumeRoute extends Route {
  @service router;

  redirect() {
    this.router.replaceWith('docs.playing-sounds');
  }
}
