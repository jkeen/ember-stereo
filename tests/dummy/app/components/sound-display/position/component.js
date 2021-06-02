import Component from "@glimmer/component";
import { htmlSafe } from "@ember/string";
import { throttle, next } from "@ember/runloop";
import { inject as service } from "@ember/service";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
export default class Position extends Component {
  @service stereo;
  @tracked element;
  @tracked dragAdjustment = 0;

  get durationIsInfinity() {
    return this.args.sound.duration === Infinity;
  }

  get playHeadPositionStyle() {
    if (!this.element) {
      return 1;
    }

    let dragAdjustmentPercentage =
      this.dragAdjustment / this.element?.getBoundingClientRect().width;
    let p = this.playedPercentage + dragAdjustmentPercentage;
    let percent = parseFloat(p, 10) * 100;

    return htmlSafe(`left : ${Math.max(0, Math.min(percent, 100))}%;`);
  }

  @action
  didInsert(element) {
    this.element = element;
  }

  @action
  handleTap(e) {
    const { center } = e.gesture;

    if (
      this.args.sound.isFastForwardable &&
      this.args.sound.isRewindable &&
      this.element
    ) {
      let rect = this.element.getBoundingClientRect();
      let positionPercentage = (center.x - rect.x) / rect.width;
      let newPosition = parseFloat(
        this.args.sound.duration * positionPercentage,
        10
      );
      next(() => {
        this.args.sound.position = parseInt(newPosition, 10);
        this.dragAdjustment = 0;
      });
    }
  }

  @action
  updatePosition(e) {
    let { deltaX } = e.gesture;
    if (this.element) {
      let width = this.element.getBoundingClientRect().width;
      let changePercentage = deltaX / width;
      let newPercentage =
        this.args.sound.position / this.args.sound.duration + changePercentage;
      let newPosition = parseFloat(
        this.args.sound.duration * newPercentage,
        10
      );
      next(() => {
        this.args.sound.position = newPosition;
        this.dragAdjustment = 0;
      });
    }
  }

  @action
  updatePlayheadPosition(e) {
    let { deltaX } = e.gesture;

    throttle(
      this,
      () => {
        this.dragAdjustment = deltaX;
      },
      200
    );
  }
}
