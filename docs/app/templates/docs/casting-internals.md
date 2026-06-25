# How Casting Works

A remote device is just another connection backend. The same machinery that swaps one local connection for another swaps local playback for an AirPlay or Chromecast one.

Two names for the same idea — the live connection to the device:

- **AirPlay route** — WebKit's name for it. When it disconnects, the route ends.
- **Chromecast session** — the Cast SDK's equivalent; it plays one piece of media at a time.

## One pipeline per transport

There is exactly one playback pipeline per transport, and every sound shares it. AirPlay and Chromecast are built to be structurally identical:

| | AirPlay | Chromecast |
| --- | --- | --- |
| The shared pipeline | one `<audio x-webkit-airplay>` element | one `RemotePlayer` + `RemotePlayerController` |
| Wrapped by | `SharedAudioAccess` | `SharedCastAccess` |
| Driven by | the `NativeAudioCasting` connections | the `Chromecast` connections |

That pipeline is created once and reused — it outlives any individual sound. If every sound made its own `RemotePlayer` (or its own airplay element), they'd all fight over the device. So one shared-access object owns the single pipeline and hands it out, **one owner at a time**, through three methods:

- **`requestControl(who)`** — release the current owner first (which pauses it), then give `who` the pipeline.
- **`releaseControl(who)`** — if `who` owns it, clear the owner.
- **`hasControl(who)`** — is `who` the owner?

## Why it matters

Switch feeds mid-stream while casting and the new connection calls `requestControl`. The old owner is released and pauses itself and the new one takes over.

Because the identity-stable `Sound` follows whichever backend has control, `currentSound` and `swap` work exactly as they do locally. There's no "we're casting now" branch in your player code, and your app only ever provides one thing: `castUrl`, a URL the device can fetch. The addon does the rest.

Back to the practical side: [Casting (AirPlay & Chromecast)](/docs/casting).
