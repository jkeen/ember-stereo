# Metadata

Sound objects can store whatever custom metadata you want. This info will stick around for as long as the sound is loaded. Pass in `metadata` object as an option to any of the `play` or `load` helpers and then retrieve that data wherever you need to.

### Media Session

When a sound is played, the [MediaSession](https://developer.mozilla.org/en-US/docs/Web/API/MediaSession) will be updated with that sound's metadata, setting the media session's `title`, `artist`, `album`, and `artwork` to the corresponding metadata values. This is what the lock screen, notification shade, car display and macOS Now Playing widget show.

The sound's duration and position are reported too, so those controls can draw a timeline and offer scrubbing.

#### Describing a timeline the audio doesn't have

Sometimes the media's own clock isn't the timeline a listener is moving through. A live stream has no duration, but if it's carrying a scheduled show, that show's window is the timeline your scrubber draws.

Pass a `timeline` in the metadata and it will be used instead of the sound's own duration and position. Both values are in milliseconds:

```js
this.stereo.play(streamUrl, {
  metadata: {
    title: 'Stronger Than Dirt',
    timeline: { duration: 3600000, position: elapsedMs },
  },
});
```

Supplying one also asserts there is something to scrub, so the OS will offer a scrubber even for a sound that reports itself unseekable.

#### Overriding the controls

By default the transport buttons do the obvious thing to the sound: play, pause, stop, seek. When your app knows better, register handlers for a specific sound:

```js
this.stereo.registerMediaSessionActions(streamUrl, {
  // seeking back on a live stream means leaving it for a recording
  seekto: (positionMs) => this.rewindTo(positionMs),
  seekbackward: (offsetMs) => this.rewindTo(this.elapsedMs - offsetMs),
  seekforward: null,
});
```

An action can be:

- **omitted**, and the library's own behaviour applies
- **a function**, which is called instead, with `positionMs` for `seekto` and `offsetMs` for `seekbackward` / `seekforward`
- **`null`**, which removes the control entirely

That last one matters, because registering a handler is what makes the OS draw the button. A no-op handler leaves a button that does nothing when pressed; `null` means no button.

`previoustrack` and `nexttrack` have no default behaviour, since a sound has no idea what the next track is. They appear only if you register them. On iOS they take the place of the seek buttons rather than joining them.

Handlers are keyed by identifier and persist until replaced, so tear them down when whatever registered them goes away:

```js
this.stereo.unregisterMediaSessionActions(streamUrl);
```

### Examples

<Docs::CustomMetadata />

Metadata can also be passed through the service:

```js

@service stereo;
...
@action
async playSound() {
  let { sound } = await this.stereo.play(this.show.audioUrl, {
    metadata: {
      title: "title of audio",
      artist: "artist",
      show: this.show
    }
  })
}
```
