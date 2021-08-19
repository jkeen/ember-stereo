# Playing Sounds

`ember-stereo` operates on sounds by providing its helpers an <em>identifier</em>. Usually this is just a URL string, but an identifier could also be an object with a `url` and a `mimeType` property, a `sound` object, an array of any of the previous items, or a promise that resolves to any of the previous. Whatever the case, you're covered.

```hbs
<button {{on 'click' (toggle-play-sound @identifier)}} type='button'>
  Play/Pause
</button>
```

Template helpers like like [sound-is-playing](/docs/api/helpers/sound-is-playing), [sound-is-loading](/docs/api/helpers/sound-is-loading), [sound-is-loaded](/docs/api/helpers/sound-is-loaded), [sound-is-errored](/docs/api/helpers/sound-is-errored), [sound-is-seekable](/docs/api/helpers/sound-is-seekable), [sound-is-rewindable](/docs/api/helpers/sound-is-rewindable), [sound-is-fastforwardable](/docs/api/helpers/sound-is-fastforwardable), [sound-is-blocked](/docs/api/helpers/sound-is-blocked), [sound-position](/docs/api/helpers/sound-position), [sound-duration](/docs/api/helpers/sound-duration), [sound-metadata](/docs/api/helpers/sound-metadata), [sound-error-details](/docs/api/helpers/sound-error-details), and [find-loaded-sound](/docs/api/helpers/find-loaded-sound) can be quickly composed to build a simple player completely in the template.

{{docs/stereo-player-example identifier="https://file-examples-com.github.io/uploads/2017/11/file_example_OOG_1MG.ogg"}}

### On Demand URL

This is using the same url as the player example above. See how the two stay in sync?

{{docs/stereo-player identifier="https://file-examples-com.github.io/uploads/2017/11/file_example_OOG_1MG.ogg"}}

### Streaming URL

When loading a streaming URL, the duration is ∞ and the position-related controls are disabled.

{{docs/stereo-player identifier="https://current.stream.publicradio.org/kcmp.aac"}}

## Interacting with the service

Back in the ember-hifi days this is how we used to play sounds… and we liked it!

{{docs/service-example}}
