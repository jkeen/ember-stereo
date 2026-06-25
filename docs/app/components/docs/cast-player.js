import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class CastPlayer extends Component {
  // BEGIN-SNIPPET cast-player.js
  @service stereo;

  // The cast lifecycle events the addon fires as a route comes and goes.
  castEvents = [
    'audio-cast-availability-changed',
    'audio-cast-connecting',
    'audio-cast-connected',
    'audio-cast-disconnected',
  ];

  @tracked log = [];

  // The transports the browser is currently offering ('airplay' in Safari,
  // 'chromecast' in Chrome with a dongle on the network, 'general' for the
  // Remote Playback API). Empty ⇒ nothing to cast to.
  get transports() {
    return [...this.stereo.castingTypes].join(', ') || '—';
  }

  // Chromecast hands us the device's friendly name; AirPlay/WebKit withholds it,
  // so fall back to the transport name.
  get deviceLabel() {
    return this.stereo.castDeviceName ?? this.stereo.castKind ?? 'a device';
  }

  @action
  prepare() {
    // The app owns exactly ONE thing in the cast handshake: handing the addon a
    // URL the *device itself* can fetch, as `sound.castUrl`. These demo streams
    // are already public, so the cast URL is just the stream URL. With it set,
    // the picker has media to offer and an engaged route knows what to load.
    this.stereo.findSound(this.args.identifier).castUrl = this.args.identifier;

    this._handlers = this.castEvents.map((name) => {
      let handler = () => this._record(name);
      this.stereo.on(name, handler);
      return { name, handler };
    });
  }

  @action
  teardown() {
    (this._handlers ?? []).forEach(({ name, handler }) =>
      this.stereo.off(name, handler)
    );
  }

  @action
  stopCasting() {
    this.stereo.stopCasting();
  }

  _record(name) {
    this.log = [{ name, device: this.deviceLabel }, ...this.log].slice(0, 8);
  }
  // END-SNIPPET
}
