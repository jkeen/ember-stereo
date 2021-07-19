# Trying multiple formats

Different browsers support different [audio formats](https://caniuse.com/?search=audio%20format) and often times. You might prefer that you serve listeners .ogg files over .mp3s and it's easy to do that by providing `stereo` an array of urls in preferntial order and it'll play the first one that works.

```js

@service stereo;
...
@action
async playSound() {
  let { sound } = await this.stereo.play(["/url/to/ogg", "/url/to/aac"])
}
```
