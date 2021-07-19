# Metadata

Sound objects can store whatever custom metadata you want. This info will stick around for as long as the sound is loaded.

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

```hbs
{{#if (sound-is-loaded this.show.audioTitle)}}
<h3 class="show-title">
  {{sound-metadata this.show.audioTitle key="title"}}
</h3>
{{/if}}
```
