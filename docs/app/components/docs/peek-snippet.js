import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class DocsPeekSnippetComponent extends Component {
  @tracked isExpanded = false;

  get label() {
    return this.args.label ?? 'template';
  }

  @action
  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
