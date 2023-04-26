# Metadata

Sound objects can store whatever custom metadata you want. This info will stick around for as long as the sound is loaded. Pass in `metadata` object as an option to any of the `play` or `load` helpers and then retreive that data wherever you need to.

### Media Session

When a sound is played, the [MediaSession](https://developer.mozilla.org/en-US/docs/Web/API/MediaSession) will be updated with that sound's metadata, setting the media session's `title`, `artist`, `album`, and `artwork` to the corresponding metadata values.

### Examples

Here's a super simple "Now Playing" display.

<Docs::CustomMetadata />

You can also pass in metadata through the service.

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
