import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
export default class DocsCustomPositionControlComponent extends Component {
  @tracked lastSelectedPosition;

  @action
  onChangePosition(position /* event */) {
    this.lastSelectedPosition = position;
  }
}
