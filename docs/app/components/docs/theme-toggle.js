import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class DocsThemeToggleComponent extends Component {
  @service theme;

  @action
  toggle() {
    this.theme.toggle();
  }
}
