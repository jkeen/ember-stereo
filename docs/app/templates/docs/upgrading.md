# Upgrading

## Upgrading to 6.0

6.0 inverts the core model. 5.x jumped through hoops to fake a stable **`Sound`** (see [Playing Sounds](/docs/playing-sounds)). Now it's real and reports `isLoading`, `errors`, and the `connection` that resolved it. This makes connection swapping (like, to the new Airplay and Chromecast connections) possible.

**Changes from 5.x -> 6.0**

### 1. `findSound` is synchronous and always returns a `Sound`

It find-or-creates and returns immediately, so drop any `await` in front of it. The returned `Sound` may still be pending, so replace "is there a sound yet?" presence checks with `isResolved` (a connection has resolved) or `isLoaded` (it's ready to play):

```js
// BEFORE: undefined until the audio loaded
if (this.stereo.findSound(url)) { /* … */ }

// AFTER: the Sound always exists, so check whether a connection resolved
if (this.stereo.findSound(url)?.isResolved) { /* … */ }
```

The Sound survives connection swaps and reports isLoading/isPending/isBlocked so listeners you attach to it before the sound is actually loaded stay valid now. When you genuinely need the underlying connection (and I don't know why you would) it's at `sound.connection`.

### 2. Match sounds by `hasUrl`, not `url ===`

A resolved `Sound` reports its connection's *normalized* URL, which won't `===` the raw identifier you handed in. Anywhere you compared event payloads against an identifier, switch to `hasUrl`:

```js
// BEFORE
this.stereo.on('audio-loaded', ({ sound }) => {
  if (sound.url === this.identifier) { this.attach(sound); }
});

// AFTER
this.stereo.on('audio-loaded', ({ sound }) => {
  if (sound.hasUrl?.(this.identifier)) { this.attach(sound); }
});
```

### 3. Guard for a `null` currentSound

`stereo.currentSound` can now clear to `null` (for example when casting disengages), so null-check it in your `current-sound-changed` handlers:

```js
this.stereo.on('current-sound-changed', ({ sound }) => {
  if (!sound) { return; }
  // …
});
```

### 4. `load`/`play` resolve to the `Sound`, not the connection

`sound` means the same thing everywhere now: the identity-stable container. It's what events hand you, what `currentSound` holds, and what `load`/`play` resolve to. The connection is still available alongside it when you genuinely need it:

```js
// BEFORE: `sound` was the connection, and you were locked to it
let { sound } = await this.stereo.play(url);

// AFTER: `sound` is the container, and the resolved connection is a sibling key. you probably don't need the connection
let { sound, connection } = await this.stereo.play(url);
```

A `Sound` can now change the connection underneath it (see [Playing Sounds](/docs/playing-sounds)), which is what makes failover and casting possible. 

### 5. Renamed and relocated

The vocabulary has been shifted a little in an attempt to make this more intuitive! A **`Sound`** is the identity-stable container you hold, a **connection** is the disposable implementation it plays through. The individual cache objects hanging off the stereo service are no longer needed, as all the relevant data lives on the `Sound`.

| Before                                  | After                                                                |
| --------------------------------------- | -------------------------------------------------------------------- |
| `stereo.findLoadedSound(url)`           | `stereo.findSound(url)`                                              |
| `stereo.loadedSounds`                   | `stereo.sounds.filter((s) => s.isLoaded)`                            |
| `stereo.loadedUrls`                     | `stereo.sounds.filter((s) => s.isLoaded).map((s) => s.url)`          |
| `stereo.cachedErrors`                   | `stereo.sounds.filter((s) => s.isErrored)`, then read `sound.errors` |
| `stereo.errorCache.find(url)`           | `stereo.findSound(url).errors`                                       |
| `sound.urlsAreEqual(a, b)`              | `sound.hasUrl(identifier)`                                           |
| `failure.erroredSound`                  | `failure.erroredConnection`                                          |
| `strategy.createSound()`                | `strategy.createConnection()`                                        |
| `stereo.metadataCache.store(url, data)` | `stereo.findSound(url).metadata = data`                              |
| `stereo.urlCache.resolve(identifier)`   | `stereo.findSound(identifier).resolveUrls()`                         |

Metadata reads are unchanged: `sound.metadata`, `stereo.currentMetadata`, `{{sound-metadata identifier}}`.

Some of them return something different than they used to:

- `sound.hasUrl` answers while a `Sound` is still pending, falling back to the identifier it was built with. It used to return `undefined`.
- `stereo.sounds` replaces the old cache-backed lists. It holds every `Sound` a load was attempted on, including pending and errored ones so filter it for the subset you want.
- `sound.url` can change over the life of the sound. A `Sound` outlives the connection under it, so failing over to another url or handing playback to a cast device moves `url` with it. In 5.x the sound was the connection, so its url never moved.
- `sound.url` is `undefined` until a `Sound` built from a promise resolves, because no url is known yet. 5.x had no pending sound to ask.

`stereo.play()` and `stereo.load()` with no url now reject instead of failing deeper in (sometimes silently)

### Casting is new, and opt-in

Nothing above is required to get it, and nothing breaks if you ignore it. If you do want AirPlay or Chromecast, the only thing your app has to supply is a `sound.castUrl`, a url the device can fetch on its own. See [Casting](/docs/casting).

---

## Coming from a 6.0 beta

If you tracked `6.0.0-beta.x`, everything above already applies to you. Two significant things changed between the last beta and 6.0 final.

### `entity` is gone, `sound` is the container

The betas resolved `{ sound, entity, failures }`, where `sound` was the connection and `entity` was the container. Trying to preserve the old API wasn't worth the vocab confusion. Naming is hard! `sound` is now the container everywhere, and the implementation rides alongside as `connection`:

```js
// BEFORE (beta)
let { sound, entity } = await this.stereo.play(url);
entity.play(); // the durable one
sound.play(); // the disposable one

// AFTER
let { sound, connection } = await this.stereo.play(url);
sound.play(); // the durable one
```
Anywhere you reached for `.entity` to get the real object, that's just `.sound` now.

### `sound.value` is `sound.connection`

Same rename, on the `Sound` itself. `value` was a holdover from the 5.x sound-proxy architecture, and .connection makes more sense in the 6.x world.

---

## Upgrading from Hifi

If you're coming from [ember-hifi](http://github.com/nypublicradio/ember-hifi), welcome!

### Why upgrade?

1. Handy template helpers make things ridiculously simpler!
2. Stereo uses [ember-concurrency](http://ember-concurrency.com) tasks instead of the home rolled mixture of rat-nested promises I devised back in 2015 when that sort of thing was in vogue. If you're using `ember-concurrency` tasks in your app you can change your `play` and `load` calls to use the task versions, at `this.stereo.playTask` and `this.stereo.loadTask`
3. Improved tooling to help deal with autoplay problems. An `audio-blocked` event was added, as well as an `autoplay-allowed` helper and a `sound-is-blocked` helper to help deal with autoplay issues. ([fixes hifi issue #44](https://github.com/nypublicradio/ember-hifi/issues/44))
4. Better defaults. Volume is now by default at 100, aka system volume. You can set `initialVolume: 50` in the environment configuration if you want to keep it at its former level.
5. Better docs, better tests, better future! ([fixes hifi issue #25](https://github.com/nypublicradio/ember-hifi/issues/25))

### Upgrade your existing app

1. Find anything that says "hifi", "ember-hifi", or "emberHifi" and rename it "stereo", "ember-stereo", or "emberStereo", respectively. The hifi service is probably the one you'll have the most of, and maybe your environment config.
2. Any event handlers that were expecting `(sound)` should now have a new signature and need to be changed to `({sound})`
   e.g.

```js
//BEFORE
this.hifi.on('event-name', (sound) => {
  /* handler */
});

//AFTER
this.stereo.on('event-name', ({ sound }) => {
  /* handler */
});
```

3. Whatever tricks you had implement to do in order to catch that uncatchable 'All Promises Failed' error in `hifi` you can remove them. `play` and `load` requests will now fail sanely. And if you don't want them to throw errors at all, instead returning the error as part of the response, you can pass `silenceErrors: true` as an option. (fixes hifi issue [#86](https://github.com/nypublicradio/ember-hifi/issues/86) and [#16](https://github.com/nypublicradio/ember-hifi/issues/16))
4. `this.stereo.connections` has been renamed to `this.stereo.connectionNames`. `this.stereo.connections` now returns the actual connection objects.
