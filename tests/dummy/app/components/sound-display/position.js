import Component from "@glimmer/component";
import { throttle, next } from "@ember/runloop";
import { inject as service } from "@ember/service";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
export default class Position extends Component {
  @service stereo;
  @tracked element;
  @tracked dragAdjustment = 0;


  get loadedSound() {
    return this.stereo.soundProxy(this.args.url)
  }

  @action
  didInsert(element) {
    this.element = element;
  }

  @action
  handleTap(e) {
    const { center } = e.gesture;

    if (
      this.loadedSound.isFastForwardable &&
      this.loadedSound.isRewindable &&
      this.element
    ) {
      let rect = this.element.getBoundingClientRect();
      let positionPercentage = (center.x - rect.x) / rect.width;
      let newPosition = parseFloat(
        this.loadedSound.duration * positionPercentage,
        10
      );
      next(() => {
        this.loadedSound.position = parseInt(newPosition, 10);
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
        this.loadedSound.position / this.loadedSound.duration + changePercentage;
      let newPosition = parseFloat(
        this.loadedSound.duration * newPercentage,
        10
      );
      next(() => {
        this.loadedSound.position = newPosition;
        this.dragAdjustment = 0;
      });
    }
  }

  @action
  updatePlayheadPosition(e) {
    let { deltaX } = e.gesture;
    if (this.element) {
      let width = this.element.getBoundingClientRect().width;
      let percentage = (this.loadedSound.position / this.loadedSound.duration);
      let pxPosition = width * percentage;

      if ((pxPosition + deltaX) < 0) {
        deltaX = -pxPosition
      } else if ((pxPosition + deltaX) >= width) {
        deltaX = width - pxPosition;
      }
    }

    throttle(
      this,
      () => {
        this.dragAdjustment = deltaX;
      },
      200
    );
  }

  @action
  handlePanEnd() {
    this.dragAdjustment = 0;
  }
}
