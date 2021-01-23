import Modifier from 'ember-modifier';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Wave from '@foobar404/wave';

export default class HifiVisualizerModifier extends Modifier {
  @service hifi;

  // states: unplayed, loaded, playing, paused, playing-elsewhere, failed

  get soundIdentifier() {
    return this.args.positional[0]
  }

  get options() {
    return this.args.named;
  }

  get type() {
    return this.options.type || 'waves';
  }

  get colors() {
    return this.options.colors;
  }

  get draw() {
    return this.options.draw;
  }

  async didReceiveArguments() {
    var canvas = this.element;
    canvas.setAttribute('id', 'canvas_' +  window.crypto.getRandomValues(new Uint32Array(1))[0])
    this.sound = this.hifi.findLoaded(this.soundIdentifier);

    if (this.sound) {
      var audioElement = this.sound.audioElement()
      var audioContext = this.sound.audioContext();
      if (audioElement) {

        if (this.draw) {
          this.runCustom()
        }
        else {
          this.runBuiltIn()
        }
      }
    }
  }

  willRemove() {
    cancelAnimationFrame(this.loopHandler);
  }

  runCustom() {
    try {
      let data = this.sound.startAnalysing();
      this.wave = new Wave();
      var frameCount = 1;

      var loopingFunction = () => {
        if (this.sound) {
          this.loopHandler = requestAnimationFrame(loopingFunction);
          this.sound.audioAnalyser().getByteFrequencyData(data);
          this.draw(data, this.element, this.options, frameCount)
          frameCount++;
          return  
        }
      }
      this.loopHandler = requestAnimationFrame(loopingFunction);
    }
    catch(e) {
      cancelAnimationFrame(this.loopHandler);
      // sound went away probably
    }
  }

  runBuiltIn(options) {
    try {
      var canvas = this.element;
      canvas.setAttribute('id', 'canvas_' +  window.crypto.getRandomValues(new Uint32Array(1))[0])
  
      let data = this.sound.startAnalysing();
      this.wave = new Wave();
      var frameCount = 1;
  
      var options = { "type": this.type, "colors": this.colors };
      var loopingFunction = () => {
        if (this.sound) {
          this.loopHandler = requestAnimationFrame(loopingFunction);
          this.sound.audioAnalyser().getByteFrequencyData(data);
          this.wave.visualize(data, canvas.id, options, frameCount)
          frameCount++;
          return  
        }
      }
      this.loopHandler = requestAnimationFrame(loopingFunction);  
    }
    catch(e) {
      cancelAnimationFrame(this.loopHandler);
      // sound went away probably
    }
  }
}


