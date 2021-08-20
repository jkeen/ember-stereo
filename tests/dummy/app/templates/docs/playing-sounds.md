# Playing Sounds

`ember-stereo` operates on sounds by providing its helpers an <em>identifier</em>. Usually this is just a URL string, but an identifier could also be an object with a `url` (and maybe a `mimeType` property), an already loaded `Sound`, an array of any of the previous items, or even a promise that resolves to any of the previous. Whatever the case, you're covered.

```hbs
<button {{on 'click' (toggle-play-sound @identifier)}} type='button'>
  Play/Pause
</button>
```

Template helpers like like [sound-is-playing](/docs/api/helpers/sound-is-playing), [sound-is-loading](/docs/api/helpers/sound-is-loading), [sound-is-loaded](/docs/api/helpers/sound-is-loaded), [sound-is-errored](/docs/api/helpers/sound-is-errored), [sound-is-seekable](/docs/api/helpers/sound-is-seekable), [sound-is-rewindable](/docs/api/helpers/sound-is-rewindable), [sound-is-fastforwardable](/docs/api/helpers/sound-is-fastforwardable), [sound-is-blocked](/docs/api/helpers/sound-is-blocked), [sound-position](/docs/api/helpers/sound-position), [sound-duration](/docs/api/helpers/sound-duration), [sound-metadata](/docs/api/helpers/sound-metadata), [sound-error-details](/docs/api/helpers/sound-error-details), and [find-sound](/docs/api/helpers/find-sound) can be quickly composed to build a simple player completely in the template.

{{docs/stereo-player-example identifier="/sounds/works-just-like-a-vcr.m4a"}}

### On Demand URL

This is using the same url as the player example above. Sound status is app-wide and stays in sync.

{{docs/stereo-player identifier="/sounds/works-just-like-a-vcr.m4a"}}

### Streaming URL

When loading a streaming URL, the duration is ∞ and the position-related controls are disabled. Here's the live web stream of the scrappy Austin community radio station, KOOP

{{docs/stereo-player identifier="https://streaming.koop.org/stream.mp3"}}

## Interacting with the service

You might need to trigger a sound from javascript land by talking directly to the `stereo` service. It's cool, back in the ember-hifi days this is how we _had_ to play sounds… and _we liked it!_

{{docs/service-example}}
