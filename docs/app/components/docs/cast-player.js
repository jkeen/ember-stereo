import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class CastPlayer extends Component {
  // BEGIN-SNIPPET cast-player.js
  @service stereo;

  castEvents = [
    'audio-cast-availability-changed',
    'audio-cast-connecting',
    'audio-cast-connected',
    'audio-cast-disconnected',
  ];

  @tracked log = [];

  get castingTypes() {
    return [...this.stereo.castingTypes].join(', ') || '—';
  }

  // Chromecast hands us the device's friendly name. AirPlay withholds it, so fall back to the kind.
  get deviceLabel() {
    return this.stereo.castDeviceName ?? this.stereo.castKind ?? 'a device';
  }

  @action
  prepare() {
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
      this.stereo.off(name, handler),
    );
  }

  get sound() {
    return this.stereo.findSound(this.args.identifier);
  }

  get nowPlaying() {
    return this.sound?.metadata?.title ?? '—';
  }

  @action
  setNowPlaying() {
    let stamp = new Date().toLocaleTimeString();
    this.sound.metadata = {
      ...this.sound.metadata,
      title: `Track at ${stamp}`,
      artist: 'ember-stereo demo',
    };
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
