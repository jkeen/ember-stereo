import classic from 'ember-classic-decorator';
import Helper from '@ember/component/helper';
import { dedupeTracked } from 'tracked-toolbox';
import hasEqualUrls from 'ember-hifi/utils/has-equal-urls';
import { inject as service } from '@ember/service';
import debug from 'debug';
/**
  A helper to display error details.
  ```hbs
    {{hifi-error-details this.url}}
  ```

  @class HifiErrorDetails
  @type Helper
  @param {String} url
*/

@classic
export default class HifiIsErrored extends Helper {
  @service hifi;

  name = 'is-errored';
  listen = ['audio-load-error', 'audio-loaded'];
  @dedupeTracked result;

  registerListeners([identifier]) {
    this.boundRecompute = (e) => this.recompute(e)

    if (!this.registered) {
      this.registered = identifier;

      this.hifi.on('audio-loaded', (sound) => {
        if (hasEqualUrls(sound.url, this.registered)) {
          this.boundRecompute()
        }
        else if (sound && this.registered == 'system') {
          this.boundRecompute()
        }
      });

      this.hifi.on('audio-load-error', (sound) => {
        if (hasEqualUrls(sound.url, this.registered)) {
          this.boundRecompute()
        }
        else if (sound && this.registered == 'system') {
          this.boundRecompute()
        }
      });
    }
  }

  /**
    @method compute
    @param {String} [url]
  * @param {Object} options
  * @param {String} options.format time, ms, s,
  * @param {Boolean} options.load load the sound if it's not loaded?
  */
  compute([identifier = 'system'], {connectionName = 'NativeAudio'}) {
    this.registerListeners([identifier]);

    let result = this.result;
    let errors = this.hifi.errorCache.find(identifier);

    if (!errors) { return }

    if (errors.length === 1) {
      let error = errors[0];
      if (error[connectionName]) {
        this.result = error[connectionName];
        debug(`ember-hifi:helpers:${this.name}:${identifier}`)(`render = ${this.result}`); 
      }
      else {
        this.result = error[Object.keys(error)[0]];
      }
    }
    else {

    }

    return this.result;
  }
}
