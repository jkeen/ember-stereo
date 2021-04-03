import { inject as service } from "@ember/service";
import Helper from "@ember/component/helper";
import hasEqualUrls from "ember-hifi/-private/utils/has-equal-urls";
import { dedupeTracked } from "tracked-toolbox";
import debug from "debug";

/**
  A helper to detect if a sound is loading.
  ```hbs
    {{#if (is-loading this.url)}}
      <p>This url is currently loading</p>
    {{else}}
      <p>This url is not currently loading</p>
    {{/if}}
  ```

  Can also look for any system-level loading event by passing in no argument
  ```hbs
    {{#if (is-loading)}}
      <p>Something is loading</p>
    {{else}}
      <p>Something is not loading</p>
    {{/if}}
  ```

  @class {{is-loading}}
  @type Helper
  @param {String} url
*/

const UNINITIALIZED = Object.freeze({});
export default class HifiIsLoading extends Helper {
  @service hifi;

  @dedupeTracked result = undefined;
  identifier = UNINITIALIZED;

  /**
    returns the state
    @method compute
    @param {String} [url]
    @return {boolean}
  */

  compute([identifier]) {
    if (identifier !== this.identifier) {
      this.identifier = identifier || "system";

      if (this.identifier == "system") {
        this.result = this.hifi.isLoading;
      } else {
        let sound = this.hifi.findLoaded(this.identifier);
        if (sound) {
          this.result = sound.isLoading;
        } else {
          this.hifi.on('pre-load', async (urlsToTry) => {
            let isEqual = await hasEqualUrls(this.identifier, urlsToTry);
            if (isEqual) {
              this.result = true;
            }
          })

          this.hifi.on(
            "new-load-request",
            async ({ loadPromise, urlsOrPromise }) => {
              let isEqual = await hasEqualUrls(this.identifier, urlsOrPromise);
              if (isEqual) {
                this.result = true;
                loadPromise.then(({ sound, failures }) => {
                  if (sound) {
                    this.result = sound.isLoading;
                  } else if (failures) {
                    this.result = false;
                  }
                });
              }
            }
          );
        }
      }
    }

    debug(`ember-hifi:helpers:is-loading:${this.identifier}`)(
      `render = ${this.result}`
    );
    return this.result;
  }
}
