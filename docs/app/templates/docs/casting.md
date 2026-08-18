# Casting (AirPlay & Chromecast)

Casting sends the audio to an AirPlay receiver or a Chromecast device instead of the local speakers. `ember-stereo` treats the remote device as another connection, that it automatically loads and injects when needed.

## Enabling casting

- **AirPlay** uses Safari's own APIs and loads nothing extra.
- **Chromecast** lazily loads the Google Cast SDK from `gstatic.com` the first time a `{{cast-button}}` or `{{casting-available}}` renders.

A device only shows up if the page is served over HTTPS and the AirPlay receiver is reachable (Safari), or a Chromecast is on the same network (Chrome). Otherwise `{{casting-available}}` stays `false` and the cast button disables itself.

## Which AirPlay receivers actually work

Not every device that shows up in Safari desktop's picker can play web audio.

AirPlay 2 receivers (Apple TV, HomePod, most hardware since about 2018) work everywhere. Audio-only receivers of the AirPort Express / 2011–2017 AV receiver vintage work perfectly from mobile Safari but not desktop Safari, and the failure is silent (which is very annoying). I can't seem to find a way to work around it, so beware that edge case. 

## `sound.castUrl`

When you play locally, the browser fetches the audio. When you cast, the device fetches it directly, so it needs a URL it can reach without your app's session or auth headers. Set that as `sound.castUrl`, a public or signed variant of the stream.

```js
let sound = this.stereo.findSound(identifier);
sound.castUrl = 'https://streaming.koop.org/stream.mp3';
```

For the public demo stream below, the cast URL is just the stream URL. In a real app it's usually the public edge of an otherwise authenticated stream.

### Updating metadata mid-cast

**AirPlay** reads metadata from the OS, so a change reaches the receiver as soon as it reaches the lock screen.

**Chromecast** is handed metadata in the load request and keeps it, so set `sound.metadata` **before** casting. Changing it afterwards updates the lock screen and your own UI but not the device, and only a reload would refresh it. A live stream whose now-playing changes mid-listen keeps the title it started with until the next cast.

## The cast button

`{{cast-button}}` turns a `<button>` into a cast control. Clicking it opens the device picker. The button disables itself when no device is reachable, and gets a `casting` class while connected, so you can style the connected state.

```hbs
<button type='button' {{cast-button}}>
  Cast
</button>
```
The identifier is optional and only affects AirPlay. The picker needs the sound's `castUrl` in place before the click, and the handler can't wait on one, so passing an identifier lets you cast a sound that isn't the current one:

```hbs
<button type='button' {{cast-button @identifier}}>Cast this episode</button>
```
## Reading cast state in templates

- `{{casting-available}}` - true when a cast device is reachable right now.
- `{{is-casting}}` - true while the audio plays on a remote device.

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

You need a real device on your network for the button to do anything: Safari for AirPlay, or Chrome with a Chromecast on the same network.

<Docs::CastPlayer @identifier="https://streaming.koop.org/stream.mp3" />

## The service API

The `stereo` service exposes:

| Property / method          | Description                                                                                                      |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `isCastingAvailable`       | `true` when a cast device is reachable.                                                                          |
| `isCasting`                | `true` when audio is playing on a remote device.                                                                 |
| `castDeviceName`           | The device's name. Chromecast provides one; AirPlay doesn't, so this can be `null`.                              |
| `castKind`                 | `'airplay'`, `'chromecast'`, or `null`.                                                                          |
| `castIconName`             | `'cast'` or `'airplay'`, for picking the right icon.                                                             |
| `castingTypes`             | A `TrackedSet` of the cast kinds currently available.                                                            |
| `showCastMenu(identifier)` | Open the device picker for a sound (what `{{cast-button}}` calls).                                               |
| `stopCasting()`            | Disconnect and return playback to the local device.                                                              |
| `prewarmCast(identifier)`  | AirPlay only: preload the cast URL so Safari's picker has media to offer on the first tap. No-op for Chromecast. |
| `ensureChromecastSetup()`  | Chromecast only: fetch the Cast SDK ahead of the first cast. Runs once, and the casting helpers call it for you. |

## Events

The service fires four cast events as a route comes and goes. See [Events](/docs/event-monitoring#casting-events).

Switching feeds mid-stream while casting needs nothing special from you. A remote device is just another connection, so `currentSound` and `swap` behave exactly as they do locally and your player code never needs a "we're casting now" branch.
