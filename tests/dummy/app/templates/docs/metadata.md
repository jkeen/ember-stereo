# Metadata

Sound objects can store whatever custom metadata you want. This info will stick around for as long as the sound is loaded. Pass in `metadata` object as an option to any of the `play` or `load` helpers and then retreive that data wherever you need to.

Here's a super simple "Now Playing" display.
{{docs/custom-metadata}}

You can also pass in metadata through the service.

```js

@service stereo;
...
@action
async playSound() {
  let { sound } = await this.stereo.play(this.show.audioUrl, {
    metadata: {
      title: "title of audio",
      show: this.show
    }
  })
}
```
