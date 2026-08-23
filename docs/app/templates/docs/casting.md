# Casting (AirPlay & Chromecast)

Casting sends the audio to an AirPlay receiver or a Chromecast device instead of the local speakers. `ember-stereo` treats the remote device as another connection, that it automatically loads and injects when needed.

## Enabling casting

- **AirPlay** uses Safari's own APIs and loads nothing extra.
- **Chromecast** lazily loads the Google Cast SDK from `gstatic.com` the first time a `{{cast-button}}` or `{{casting-available}}` renders.

A device only shows up if the page is served over HTTPS and the AirPlay receiver is reachable (Safari), or a Chromecast is on the same network (Chrome). Otherwise `{{casting-available}}` stays `false` and the cast button disables itself.

## `sound.castUrl`

When you cast the device fetches the audio directly, meaning if it can't reach it without your app's session or auth headers it won't play. Set `sound.castUrl` to a public or signed variant of the stream if you need it.

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

Casting always follows the current sound. Whatever is playing when you pick a device moves to it, and anything you play afterwards goes there too, until you disconnect.

## Reading cast state in templates

- `{{casting-available}}` - true when a cast device is reachable right now.
- `{{is-casting}}` - true while the audio plays on a remote device.

```hbs
<button type='button' {{cast-button}}>
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

Stream:
<Docs::StereoPlayer @identifier="https://streaming.koop.org/stream.aac" />
Fixed audio:
<Docs::StereoPlayer @identifier="https://audio.wnyc.org/bl/bl011421dpod.mp3" />

<Docs::CastPlayer />

## The service API

The `stereo` service exposes:

- `isCastingAvailable` - `true` when a cast device is reachable
- `isCasting` - `true` when audio is playing on a remote device
- `castDeviceName` - the device's name. Chromecast provides one, AirPlay doesn't, so this can be `null`
- `castKind` - `'airplay'`, `'chromecast'`, or `null`
- `castIconName` - `'cast'`, `'airplay'`, or `null` when nothing is reachable, for picking the right icon
- `supportedCastType` - which kind of casting this browser can do at all (`'airplay'`, `'chromecast'`, or `null`), even before any device is found
- `showCastMenu()` - open the device picker (what `{{cast-button}}` calls)
- `stopCasting()` - disconnect and return playback to the local device

## Events

The service fires four cast events as casting starts and stops. See [Events](/docs/event-monitoring#casting-events).

Switching feeds mid-stream while casting needs nothing special from you. A remote device is just another connection, so `currentSound` and `swap` behave exactly as they do locally and your player code never needs a "we're casting now" branch.

## Which AirPlay receivers actually work

Not every device that shows up in Safari desktop's picker can play web audio.

AirPlay 2 receivers (Apple TV, HomePod, most hardware since about 2018) work everywhere. Audio-only receivers of the AirPort Express / 2011–2017 AV receiver vintage work perfectly from mobile Safari but not desktop Safari, and the failure is silent (which is very annoying). I can't seem to find a way to work around it, so beware that edge case.
