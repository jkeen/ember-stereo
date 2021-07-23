# Metadata

Sound objects can store whatever custom metadata you want. This info will stick around for as long as the sound is loaded.


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
