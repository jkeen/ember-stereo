# Casting (AirPlay & Chromecast)

Casting sends the audio to an AirPlay receiver or a Chromecast device instead of the local speakers. `ember-stereo` treats the remote device as another backend: the same `Sound`, the same `currentSound`, the same helpers. The audio just comes out somewhere else.

The addon handles the whole lifecycle — finding cast targets, showing the picker, connecting and disconnecting, keeping the clock in sync, and pausing whatever was playing locally. Your app supplies one thing: a URL the device can fetch on its own.

## Enabling casting

There's nothing to configure. Unlike the optional `connections` (see [What's in the box](/docs/overview)), the casting backends are wired up automatically:

- **AirPlay** is native to Safari and works out of the box.
- **Chromecast** loads the Google Cast SDK on demand the first time the casting API is used — no script tag, no app id, no setup. (It registers against the default media receiver.)

Two things have to be true at runtime for a device to actually appear:

- The page is served over **HTTPS** (both transports require a secure context).
- There's a reachable device — an AirPlay receiver for Safari, or a Chromecast on the same network for Chrome.

When neither is true, `{{casting-available}}` stays `false` and the cast button disables itself. That's the expected idle state, not a misconfiguration.

## Your one job: `sound.castUrl`

When you play locally, the browser fetches the audio. When you cast, the *device* fetches it directly, so it needs a URL it can reach without your app's session or auth headers. That's `sound.castUrl` — a public or signed variant of the stream.

```js
let sound = this.stereo.findSound(identifier);
sound.castUrl = 'https://streaming.koop.org/stream.mp3';
```

For the public demo stream below, the cast URL is just the stream URL. In a real app it's usually the public edge of an otherwise authenticated stream. Set it and the picker has something to offer; leave it unset and there's nothing to hand the device.

## The cast button

`{{cast-button identifier}}` turns a `<button>` into a cast control. Clicking it opens the device picker for that sound (or the current sound). The button disables itself when no device is reachable, and gets a `casting` class while connected, so you can style the connected state.

```hbs
<button type='button' {{cast-button @identifier}}>
  Cast
</button>
```

## Reading cast state in templates

Two helpers cover the common cases:

- `{{casting-available}}` — is a cast device reachable right now?
- `{{is-casting}}` — is the audio currently playing on a remote device?

```hbs
<button type='button' {{cast-button @identifier}}>
  {{#if (is-casting)}}
    Casting…
  {{else if (casting-available)}}
    Cast
  {{else}}
    No cast targets available
  {{/if}}
</button>
```

## Live demo

You need a real device on your network for the button to do anything: Safari for AirPlay, or Chrome with a Chromecast on the same network. Without one, the button reads "No cast targets available" and stays disabled — that's expected, not a bug.

<Docs::CastPlayer @identifier="https://streaming.koop.org/stream.mp3" />

## The service API

To drive casting from JavaScript, the `stereo` service exposes the full surface:

| Property / method | Description |
| --- | --- |
| `isCastingAvailable` | `true` when a cast device is reachable. |
| `isCasting` | `true` when audio is playing on a remote device. |
| `castDeviceName` | The device's name. Chromecast provides one; AirPlay doesn't, so this can be `null`. |
| `castKind` | `'airplay'`, `'chromecast'`, or `null`. |
| `castIconName` | `'cast'` or `'airplay'`, for picking the right icon. |
| `castingTypes` | A `TrackedSet` of the transports currently available. |
| `showCastMenu(identifier)` | Open the device picker for a sound (what `{{cast-button}}` calls). |
| `stopCasting()` | Disconnect and return playback to the local device. |
| `prewarmCast(identifier)` | AirPlay only: preload the cast URL onto the AirPlay element so Safari's picker has media to offer on the first tap (the click can't wait on an async URL fetch). No-op for Chromecast. |

## Events

The `stereo` service fires these as casting connects and disconnects — useful for analytics, toasts, or your own UI:

- `audio-cast-availability-changed` — a device appeared or disappeared.
- `audio-cast-connecting` — connecting to a device.
- `audio-cast-connected` — audio is now playing on the device.
- `audio-cast-disconnected` — disconnected; playback returned to local.

For how casting stays consistent when you switch feeds mid-stream — one shared pipeline per transport, with single-ownership — see [How casting works](/docs/casting-internals).
