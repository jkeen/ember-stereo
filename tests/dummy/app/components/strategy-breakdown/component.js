import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import { action } from "@ember/object";
import { tracked } from '@glimmer/tracking';
import { trackedReset } from 'tracked-toolbox';
import hasEqualUrls from 'ember-stereo/-private/utils/has-equal-urls';
import StereoUrl from 'ember-stereo/-private/utils/stereo-url';
import Strategy from 'ember-stereo/-private/utils/strategy';
import { waitForEvent, task, race, timeout } from 'ember-concurrency';
import { makeArray } from '@ember/array';
import deepSet from "ember-deep-set";

export default class StrategyBreakdown extends Component {
  @service stereo;
  @tracked selectedConnections = this.stereo.connections
  @trackedReset('args.url') specifiedUrl = this.args.url;
  @trackedReset('args.url') selectedStrategies = this.selectedConnections

  get url() {
    if (this.loadedSound) {
      return this.loadedSound.url
    }
    else {
      return this.specifiedUrl
    }
  }

  get loadedSound() {
    return this.stereo.loadedSounds.find(sound => hasEqualUrls(sound.url, this.specifiedUrl))
  }

  get errorInfo() {
    return this.stereo.cachedErrors.find(e => hasEqualUrls(e.url, this.specifiedUrl))
  }

  get loadWasAttempted() {
    return (this.errorInfo || this.loadedSound)
  }

  get strategyInfo() {
    return makeArray(Object.values(this.stereo._connections)).map(connection => {
      return new Strategy(connection, this.url);
    });
  }

  get strategyResults() {
    if (this.loadedSound) {
      return this.loadedSound._debug
    } else if (this.errorInfo) {
      return this.errorInfo._debug;
    } else {
      return this.strategyInfo;
    }
  }

  @action getItem(itemName) {
    return this.strategyResults.find(s => s.connectionKey == itemName)
  }

}
