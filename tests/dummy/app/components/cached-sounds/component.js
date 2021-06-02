import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import move from "ember-animated/motions/move";
import { easeOut, easeIn } from "ember-animated/easings/cosine";
import { parallel } from "ember-animated";
import scale from "ember-animated/motions/scale";
export default class CachedSound extends Component {
  @service stereo;

  get loadedItems() {
    return this.stereo.soundCache.cachedList.map((url) =>
      this.stereo.soundCache.find(url)
    );
  }

  get loadedSoundCountSentence() {
    let count = this.stereo.soundCache.cachedCount;
    if (count === 1) {
      return "1 Loaded Sound";
    } else if (count > 1) {
      return `${count} Loaded Sounds`;
    } else {
      return `Loaded Sounds`;
    }
  }

  //eslint-disable-next-line
  *transition(context) {
    let { keptSprites, removedSprites, insertedSprites, beacons } = context;
    keptSprites.forEach((sprite) => parallel(move(sprite), scale(sprite)));

    removedSprites.forEach((sprite) => {
      sprite.applyStyles({ "z-index": "1" });
      // It'd be great to rotate this thing -30degrees as it drops. But how
      sprite.endAtPixel({ y: 4000 });
      parallel(move(sprite, { easing: easeOut, duration: 1200 }));
    }),
      insertedSprites.forEach((sprite) => {
        let connectionName = sprite.element.getAttribute(
          "data-connection-name"
        );
        sprite.startAtSprite(beacons[connectionName]);
        parallel(move(sprite, { easing: easeIn, duration: 500 }));
      });
  }
}
