# Debugging

`ember-stereo` logs its internals through the [`debug`](https://github.com/debug-js/debug) package, namespaced under `ember-stereo:*`. Nothing is logged until you opt in, so production stays quiet.

## Turning on logging

Set `localStorage.debug` in your browser console and reload:

```js
// Everything ember-stereo has to say
localStorage.debug = 'ember-stereo:*';

// Just one subsystem
localStorage.debug = 'ember-stereo:strategizer';

// A few at once
localStorage.debug = 'ember-stereo:sound,ember-stereo:service';
```

To turn it back off: `localStorage.removeItem('debug')` (then reload).

## The namespaces

| Namespace | What it traces |
| --- | --- |
| `ember-stereo:service` | The `stereo` service — load/play requests, current-sound changes. |
| `ember-stereo:sound` | A `Sound`'s lifecycle: connection resolution and backend swaps. |
| `ember-stereo:strategizer` | How a URL is turned into an ordered list of connections to try. |
| `ember-stereo:canPlay` | Per-connection format/platform decisions during strategy building. |
| `ember-stereo:one-at-at-time` | The "only one sound plays" arbitration. |
| `ember-stereo:shared-audio-access` | The shared AirPlay outlet element and its single-owner handoff. |
| `ember-stereo:shared-cast-access` | The shared Chromecast pipeline and its single-owner handoff. |
| `ember-stereo:fake-element` | The test-environment fake media element (see [Testing](/docs/testing)). |

## Inspecting state directly

The service also exposes a few read-only getters that are handy from the console:

- `stereo.currentSound` — the `Sound` currently loaded.
- `stereo.loadedSounds` / `stereo.loadedUrls` — everything currently cached.
- `stereo.connections` — the active connection instances, in priority order.
- `stereo.cachedErrors` — load failures, keyed by URL.

When a load fails, the error carries a `debugInfo` array describing every strategy that was tried and why each one was rejected — the fastest way to answer "why won't this URL play here?"
