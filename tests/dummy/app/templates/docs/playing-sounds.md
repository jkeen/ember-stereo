
# Playing Sounds

Stereo can load sounds by providing a url, or an object with a `.url` property. If you don't know the URL of the audio at page load, you can also provide `stereo` (or any stereo helper) with a promise that resolves to a `url`. 

Template action helpers like [load-sound](/docs/api/helpers/load-sound), [play-sound](/docs/api/helpers/play-sound), [toggle-play-sound](/docs/api/helpers/toggle-play-sound), [seek-sound](/docs/api/helpers/seek-sound), [rewind-sound](/docs/api/helpers/rewind-sound), [fastforward-sound](/docs/api/helpers/fastforward-sound), and [stop-sound](/docs/api/helpers/stop-sound) all take a url, and are used like this: 

```hbs
<button {{on 'click' (toggle-play-sound @url)}} type="button">
  Play/Pause
</button>
```
Template helpers like like [sound-is-playing](/docs/api/helpers/sound-is-playing), [sound-is-loading](/docs/api/helpers/sound-is-loading), [sound-is-loaded](/docs/api/helpers/sound-is-loaded), [sound-is-errored](/docs/api/helpers/sound-is-errored), [sound-is-seekable](/docs/api/helpers/sound-is-seekable), [sound-is-rewindable](/docs/api/helpers/sound-is-rewindable), [sound-is-fastforwardable](/docs/api/helpers/sound-is-fastforwardable), [sound-is-blocked](/docs/api/helpers/sound-is-blocked), [sound-position](/docs/api/helpers/sound-position), [sound-duration](/docs/api/helpers/sound-duration), [sound-metadata](/docs/api/helpers/sound-metadata), [sound-error-details](/docs/api/helpers/sound-error-details), and [find-loaded-sound](/docs/api/helpers/find-loaded-sound) can be quickly composed to build a simple player completely in the template.

{{docs/stereo-player-example url="https://file-examples-com.github.io/uploads/2017/11/file_example_OOG_1MG.ogg"}}

### On Demand URL
This is using the same url as the player example above. See how the two stay in sync? 
{{docs/stereo-player url="https://file-examples-com.github.io/uploads/2017/11/file_example_OOG_1MG.ogg"}}

### Streaming URL
When loading a streaming URL, the duration is ∞ and the position-related controls are disabled.
{{docs/stereo-player url="https://streaming.koop.org/stream.mp3"}}

## Interacting with the service
Back in the ember-hifi days this is how we used to play sounds… and we liked it! 

{{docs/service-example}}
