ember-stereo changelog

# [5.0.0-beta.20](https://github.com/jkeen/ember-stereo/compare/v5.0.0-beta.19...v5.0.0-beta.20) (2024-03-18)


### Bug Fixes

* if crossorigin=anonymous fails on <audio> element, automatically try removing crossorigin. Resolves CORS issue ([3bbda22](https://github.com/jkeen/ember-stereo/commit/3bbda2277c7d5b74190c6a3adf2a971635053afe))
* Implement proper teardown on sound destruction ([f1d6355](https://github.com/jkeen/ember-stereo/commit/f1d6355c845b43c8f10c93abde5782fe664be1b3))
* only show durationWorkaroundTask error if the task wasn't cancelled ([c5f6b08](https://github.com/jkeen/ember-stereo/commit/c5f6b080529f1e32af65dd9c8dc87f959b2da46f))
* Resolve issue introduced in last version when multiple sound position sliders on the same page ([a2dc4bd](https://github.com/jkeen/ember-stereo/commit/a2dc4bdb9f8313d72f98731f729c896b8e398b31))
* resolve issue when trying to play a sound that is already playing. fixes [#23](https://github.com/jkeen/ember-stereo/issues/23) ([dc32ba3](https://github.com/jkeen/ember-stereo/commit/dc32ba3aae8f751144430a28ff9567ca0c5e118a))
* Resolve issue where sound-position-progress modifier would not work with howler since howler doesn't emit audio-position-changed events ([77408ff](https://github.com/jkeen/ember-stereo/commit/77408ffa9a3637ee89eeeb076cd48acfaaebdd59))
* Resolve some more bugs with sound-position modifiers ([fb496c3](https://github.com/jkeen/ember-stereo/commit/fb496c3a10498bc274c51f1489c7d6a90d7fc8e6))
* send pause event when releasing control of shared audio element ([f7fec45](https://github.com/jkeen/ember-stereo/commit/f7fec45ab46b6bd37817e94ef393e0bfd5593f9b))


### Features

* Allow xhr option to be passed through to connections, so each connection can handle authenticated requests ([82fc6ad](https://github.com/jkeen/ember-stereo/commit/82fc6ad9d1cfec1a15cf80960a92d7d9c63f7c0c))
* Fail native audio connection if xhr is passed, as native audio does not support that. ([93dea68](https://github.com/jkeen/ember-stereo/commit/93dea688f8023013657c61953ec75f0f59835f5f))
* improve firing resolution of audio-position-changed event. refs [#24](https://github.com/jkeen/ember-stereo/issues/24) ([0777253](https://github.com/jkeen/ember-stereo/commit/0777253152bc6e65448a13fca9a71168cc3971c1))

# [5.0.0-beta.19](https://github.com/jkeen/ember-stereo/compare/v5.0.0-beta.18...v5.0.0-beta.19) (2024-03-18)


### Features

* improve firing resolution of audio-position-changed event. refs [#24](https://github.com/jkeen/ember-stereo/issues/24) ([e1ebbc0](https://github.com/jkeen/ember-stereo/commit/e1ebbc05dbfe6fd6e7d13f62d4a71c6b9d1034fc))

# [5.0.0-beta.18](https://github.com/jkeen/ember-stereo/compare/v5.0.0-beta.17...v5.0.0-beta.18) (2024-03-05)


### Bug Fixes

* improve volume slider logic ([79d7d8b](https://github.com/jkeen/ember-stereo/commit/79d7d8bf8232e782c7545677e9dcd63ad4d247c9))

# [5.0.0-beta.17](https://github.com/jkeen/ember-stereo/compare/v5.0.0-beta.16...v5.0.0-beta.17) (2024-03-03)

# [5.0.0-beta.16](https://github.com/jkeen/ember-stereo/compare/v5.0.0-beta.15...v5.0.0-beta.16) (2024-03-02)

# [5.0.0-beta.15](https://github.com/jkeen/ember-stereo/compare/v5.0.0-beta.14...v5.0.0-beta.15) (2024-01-12)

# [5.0.0-beta.14](https://github.com/jkeen/ember-stereo/compare/v5.0.0-beta.13...v5.0.0-beta.14) (2024-01-11)


### Bug Fixes

* revert previous change, fix the actual problem ([364720e](https://github.com/jkeen/ember-stereo/commit/364720eb2f8eb88ee322aedfd6a2811a2e30dee2))

# [5.0.0-beta.13](https://github.com/jkeen/ember-stereo/compare/v5.0.0-beta.12...v5.0.0-beta.13) (2024-01-11)


### Bug Fixes

* move urlsAreEqual to base class so all connections benefit ([efd16a2](https://github.com/jkeen/ember-stereo/commit/efd16a2a2fa5bb8ea3bc61ffd5c10ec69aa96c63))

# [5.0.0-beta.12](https://github.com/jkeen/ember-stereo/compare/v5.0.0-beta.11...v5.0.0-beta.12) (2023-11-12)


### Bug Fixes

* cancel block check if sound is already playing (howler) ([85254b2](https://github.com/jkeen/ember-stereo/commit/85254b2e41bed000f840c53161f2a3552e4a6915))
* resolve issue when trying to play a sound that is already playing. fixes [#23](https://github.com/jkeen/ember-stereo/issues/23) ([321bc19](https://github.com/jkeen/ember-stereo/commit/321bc198add38b33c175550a8ef143f4bcd56206))
* send pause event when releasing control of shared audio element ([8620ab8](https://github.com/jkeen/ember-stereo/commit/8620ab81317a0c7486656a3c1667ab72fb9d38e9))

# [5.0.0-beta.11](https://github.com/jkeen/ember-stereo/compare/v5.0.0-beta.10...v5.0.0-beta.11) (2023-07-19)


### Bug Fixes

* Don't play howl if it's already playing ([072e429](https://github.com/jkeen/ember-stereo/commit/072e4291f6e0de488578d1e5f488ab27ffd55f5e))

# [5.0.0-beta.10](https://github.com/jkeen/ember-stereo/compare/v5.0.0-beta.9...v5.0.0-beta.10) (2023-07-11)


### Bug Fixes

* limit percentage between 0 and 100 ([e2d4537](https://github.com/jkeen/ember-stereo/commit/e2d45374a8163f88c9b2159befcd37d851431764))
* pass in newPosition to sound-position-progress if available ([cfaf2a3](https://github.com/jkeen/ember-stereo/commit/cfaf2a32239c38e37e90dc23dc6ad937eb3dcbf1))

# [5.0.0-beta.9](https://github.com/jkeen/ember-stereo/compare/v5.0.0-beta.8...v5.0.0-beta.9) (2023-07-10)


### Features

* adjust logic to allow for live streaming HLS files and allowing ([a633c17](https://github.com/jkeen/ember-stereo/commit/a633c17b8204d05a94ea1e98297ab8e20581d846))

# [5.0.0-beta.8](https://github.com/jkeen/ember-stereo/compare/v5.0.0-beta.7...v5.0.0-beta.8) (2023-06-30)

# [5.0.0-beta.7](https://github.com/jkeen/ember-stereo/compare/v5.0.0-beta.6...v5.0.0-beta.7) (2023-06-09)


### Bug Fixes

* reduce fake media element timer to every 500ms instead of 100ms ([9a0278d](https://github.com/jkeen/ember-stereo/commit/9a0278df97218414b082af438a90a80003af586f))


### Features

* Allow xhr option to be passed through to connections, so each connection can handle authenticated requests ([cb00c5d](https://github.com/jkeen/ember-stereo/commit/cb00c5d3d3d816978270ad2673938f8d62e9d655))
* Fail native audio connection if xhr is passed, as native audio does not support that. ([8d0f3b5](https://github.com/jkeen/ember-stereo/commit/8d0f3b530dad661cac478ee04e1fd221b85da763))

# [5.0.0-beta.6](https://github.com/jkeen/ember-stereo/compare/v5.0.0-beta.5...v5.0.0-beta.6) (2023-05-27)


### Bug Fixes

* improve fake media element cleanup in tests ([af128d1](https://github.com/jkeen/ember-stereo/commit/af128d1c28c5c3532653dc2dbb74729bb85fb180))

# [5.0.0-beta.5](https://github.com/jkeen/ember-stereo/compare/v5.0.0-beta.4...v5.0.0-beta.5) (2023-05-25)


### Bug Fixes

* timing issue with sound proxy in test environment ([eae0b3b](https://github.com/jkeen/ember-stereo/commit/eae0b3b15d83abfb95e5f6c78522b04e83aba5b0))

# [5.0.0-beta.4](https://github.com/jkeen/ember-stereo/compare/v5.0.0-beta.3...v5.0.0-beta.4) (2023-05-24)


### Bug Fixes

* Resolve some more bugs with sound-position modifiers ([2de3d45](https://github.com/jkeen/ember-stereo/commit/2de3d4539d0fbf8aa1e7f6b21edc820534b8c03d))

# [5.0.0-beta.3](https://github.com/jkeen/ember-stereo/compare/v5.0.0-beta.2...v5.0.0-beta.3) (2023-05-24)


### Bug Fixes

* Resolve issue introduced in last version when multiple sound position sliders on the same page ([7db16c1](https://github.com/jkeen/ember-stereo/commit/7db16c162ab92025cc34a1f2b91f251244e46e1c))

# [5.0.0-beta.2](https://github.com/jkeen/ember-stereo/compare/v5.0.0-beta.1...v5.0.0-beta.2) (2023-05-23)


### Bug Fixes

* correctly handle setting currentSound = null ([c8f0e58](https://github.com/jkeen/ember-stereo/commit/c8f0e581cf4111bda739ff61874874988eaa6e29))
* if crossorigin=anonymous fails on <audio> element, automatically try removing crossorigin. Resolves CORS issue ([984eba7](https://github.com/jkeen/ember-stereo/commit/984eba7143f605c0a6b88de0f5ee797c31ccab3d))
* Implement proper teardown on sound destruction ([82affba](https://github.com/jkeen/ember-stereo/commit/82affba6bc544510b7de2daef5776296dd4b8dca))
* Resolve issue where sound-position-progress modifier would not work with howler since howler doesn't emit audio-position-changed events ([a8d75bb](https://github.com/jkeen/ember-stereo/commit/a8d75bb4922b5c2d6651f656be19fa7d64280fae))
* resolve typo which caused incorrect handling of autoplay check during testing ([57f3680](https://github.com/jkeen/ember-stereo/commit/57f36804fc64a265691c5dbd95a26c7d7f7fd03f))


### Features

* Implement additional MediaSession actions and play state ([6f6e47a](https://github.com/jkeen/ember-stereo/commit/6f6e47a280987faf6ec4bae191bf7f22351751df))

# [5.0.0-beta.1](https://github.com/jkeen/ember-stereo/compare/v4.1.1...v5.0.0-beta.1) (2023-04-30)


## [4.3.1](https://github.com/jkeen/ember-stereo/compare/v4.3.0...v4.3.1) (2024-03-18)


### Bug Fixes

* only show durationWorkaroundTask error if the task wasn't cancelled ([6b6410b](https://github.com/jkeen/ember-stereo/commit/6b6410b64a9d4855ba7e6e0a06b9987022474164))

# [4.3.0](https://github.com/jkeen/ember-stereo/compare/v4.2.3...v4.3.0) (2023-11-12)


### Features

* improve firing resolution of audio-position-changed event. refs [#24](https://github.com/jkeen/ember-stereo/issues/24) ([0777253](https://github.com/jkeen/ember-stereo/commit/0777253152bc6e65448a13fca9a71168cc3971c1))

## [4.2.3](https://github.com/jkeen/ember-stereo/compare/v4.2.2...v4.2.3) (2023-11-12)


### Bug Fixes

* resolve issue when trying to play a sound that is already playing. fixes [#23](https://github.com/jkeen/ember-stereo/issues/23) ([dc32ba3](https://github.com/jkeen/ember-stereo/commit/dc32ba3aae8f751144430a28ff9567ca0c5e118a))

## [4.2.2](https://github.com/jkeen/ember-stereo/compare/v4.2.1...v4.2.2) (2023-11-02)


### Bug Fixes

* send pause event when releasing control of shared audio element ([f7fec45](https://github.com/jkeen/ember-stereo/commit/f7fec45ab46b6bd37817e94ef393e0bfd5593f9b))

## [4.2.1](https://github.com/jkeen/ember-stereo/compare/v4.2.0...v4.2.1) (2023-07-19)

# [4.2.0](https://github.com/jkeen/ember-stereo/compare/v4.1.4...v4.2.0) (2023-06-17)


### Features

* Allow xhr option to be passed through to connections, so each connection can handle authenticated requests ([82fc6ad](https://github.com/jkeen/ember-stereo/commit/82fc6ad9d1cfec1a15cf80960a92d7d9c63f7c0c))
* Fail native audio connection if xhr is passed, as native audio does not support that. ([93dea68](https://github.com/jkeen/ember-stereo/commit/93dea688f8023013657c61953ec75f0f59835f5f))

## [4.1.4](https://github.com/jkeen/ember-stereo/compare/v4.1.3...v4.1.4) (2023-05-24)


### Bug Fixes

* Resolve some more bugs with sound-position modifiers ([fb496c3](https://github.com/jkeen/ember-stereo/commit/fb496c3a10498bc274c51f1489c7d6a90d7fc8e6))

## [4.1.3](https://github.com/jkeen/ember-stereo/compare/v4.1.2...v4.1.3) (2023-05-24)


### Bug Fixes

* Resolve issue introduced in last version when multiple sound position sliders on the same page ([a2dc4bd](https://github.com/jkeen/ember-stereo/commit/a2dc4bdb9f8313d72f98731f729c896b8e398b31))

## [4.1.2](https://github.com/jkeen/ember-stereo/compare/v4.1.1...v4.1.2) (2023-05-23)


### Bug Fixes

* if crossorigin=anonymous fails on <audio> element, automatically try removing crossorigin. Resolves CORS issue ([3bbda22](https://github.com/jkeen/ember-stereo/commit/3bbda2277c7d5b74190c6a3adf2a971635053afe))
* Implement proper teardown on sound destruction ([f1d6355](https://github.com/jkeen/ember-stereo/commit/f1d6355c845b43c8f10c93abde5782fe664be1b3))
* Resolve issue where sound-position-progress modifier would not work with howler since howler doesn't emit audio-position-changed events ([77408ff](https://github.com/jkeen/ember-stereo/commit/77408ffa9a3637ee89eeeb076cd48acfaaebdd59))

## [4.1.1](https://github.com/jkeen/ember-stereo/compare/v4.1.0...v4.1.1) (2023-04-23)


### Bug Fixes

* correct logical error in sound-position-progress modifier ([8ac52ba](https://github.com/jkeen/ember-stereo/commit/8ac52ba3f6630f31aa34fb1059e8ecbd3a5ae1d1))

# [4.1.0](https://github.com/jkeen/ember-stereo/compare/v4.0.3...v4.1.0) (2023-04-23)

### Features

- Accept multiple identifiers into metadata cache in order to support providing fallback urls into stereo ([7a8226b](https://github.com/jkeen/ember-stereo/commit/7a8226b495a59b673e3cf9692e69d34242d515ba))

## [4.0.3](https://github.com/jkeen/ember-stereo/compare/v4.0.2...v4.0.3) (2023-04-17)

### Bug Fixes

- update slider and progress modifiers to better handle changes when the url changes ([235d563](https://github.com/jkeen/ember-stereo/commit/235d5637419ddf419c07e4ce5897ee4fd27af0cc))

## [4.0.2](https://github.com/jkeen/ember-stereo/compare/v4.0.1...v4.0.2) (2022-12-24)

### Bug Fixes

- update ember-modifier, fix invalid super call on sound-position-slider modifier ([f68b01b](https://github.com/jkeen/ember-stereo/commit/f68b01b56f35e02233a58c9739839e7d99bd78b1))

## [4.0.1](https://github.com/jkeen/ember-stereo/compare/v4.0.0...v4.0.1) (2022-12-13)

### Bug Fixes

- remove console.log statement in volume modifier ([6ff4940](https://github.com/jkeen/ember-stereo/commit/6ff494048d3c591157adb587a736095de0183872))

# [4.0.0](https://github.com/jkeen/ember-stereo/compare/v3.2.2...v4.0.0) (2022-12-13)

- chore!: update to Ember 4.8, modify release settings ([871c7e5](https://github.com/jkeen/ember-stereo/commit/871c7e534aee7a4dbfd46fb1cda3c7192909cd41))

### BREAKING CHANGES

- drop support for Ember < 3.28

## [3.2.2](https://github.com/jkeen/ember-stereo/compare/v3.2.1...v3.2.2) (2022-09-02)

### Bug Fixes

- update import statement in setupStereoTest for Ember 4.x ([f53bd70](https://github.com/jkeen/ember-stereo/commit/f53bd7053e0d79b8a1242ec38bd9ec6833e2caa1))

## [3.2.1](https://github.com/jkeen/ember-stereo/compare/v3.2.0...v3.2.1) (2022-08-21)

### Bug Fixes

- Set cross-origin to anonymous on elements to allow for audio analysis using web audio api ([34022a4](https://github.com/jkeen/ember-stereo/commit/34022a45a8aa7510783d6cbcac8a0fbd9733f46b))

# [3.2.0](https://github.com/jkeen/ember-stereo/compare/v3.1.2...v3.2.0) (2022-07-14)

### Bug Fixes

- diagnostic display problems ([1c20e8a](https://github.com/jkeen/ember-stereo/commit/1c20e8ae703d32020c8515320c0f9e5138f08993))
- resume fixed audio at same point it was paused ([075d674](https://github.com/jkeen/ember-stereo/commit/075d67454a43a273bd410c2793fba7d4d424353f))

### Features

- try to better detect whether or not audio source is a stream based on duration changes for cases where element does not correctly indicate Infinity ([58bcd7c](https://github.com/jkeen/ember-stereo/commit/58bcd7c615870a19369c8226a0653c4aa9ffd53f))

## [3.1.2](https://github.com/jkeen/ember-stereo/compare/v3.1.1...v3.1.2) (2022-07-12)

### Bug Fixes

- update ember-get-config to resolve docs not deploying ([a393404](https://github.com/jkeen/ember-stereo/commit/a3934045971540329d8453efd5245e7af80c154b))

## [3.1.1](https://github.com/jkeen/ember-stereo/compare/v3.1.0...v3.1.1) (2022-07-12)

### Bug Fixes

- use object spread operator to replace Ember.assign and fix deprecation ([#12](https://github.com/jkeen/ember-stereo/issues/12)) ([43a2358](https://github.com/jkeen/ember-stereo/commit/43a23584f182465bc6ffb9bdf55619d21c1d77bd))

# [3.1.0](https://github.com/jkeen/ember-stereo/compare/v3.0.4...v3.1.0) (2022-07-11)

### Features

- Ember 4 compatibility ([162f1bf](https://github.com/jkeen/ember-stereo/commit/162f1bf67c9f0da65a8e67f4d2d084bff0396867)), closes [#11](https://github.com/jkeen/ember-stereo/issues/11).
- upgrade addon to Ember 4.4, upgrade some dependencies

### Bug Fixes

- Fix tracked values being updated in the same runloop they were used. Thanks @fusion2004!

## [3.0.4](https://github.com/jkeen/ember-stereo/compare/v3.0.3...v3.0.4) (2022-02-23)

### Bug Fixes

- improve performance of sound-metadata helper ([f2ce636](https://github.com/jkeen/ember-stereo/commit/f2ce63696e71c797d2713bc2f99a5ecd011a12c9))

## [3.0.3](https://github.com/jkeen/ember-stereo/compare/v3.0.2...v3.0.3) (2022-02-23)

### Bug Fixes

- lookup sound metadata through the service and not through the sound (which may not be loaded yet) ([424f119](https://github.com/jkeen/ember-stereo/commit/424f1190f2cc090f720a1803ad81d96bd98839c4))

## [3.0.2](https://github.com/jkeen/ember-stereo/compare/v3.0.1...v3.0.2) (2022-02-14)

### Bug Fixes

- use forked ember-cli-addon docs to work with ember-auto-import 2/embroider so we can deploy the docs correctly. Update to angle bracket syntax of demo.snippet ([520f2f7](https://github.com/jkeen/ember-stereo/commit/520f2f7b2d19a580270d2436a8d7543d83f49458))

## [3.0.1](https://github.com/jkeen/ember-stereo/compare/v3.0.0...v3.0.1) (2022-02-03)

### Bug Fixes

- preventDefault on {{sound-position-slider}} and {{stereo-volume}} modifier clicks ([6252d95](https://github.com/jkeen/ember-stereo/commit/6252d95263d5706be5dff14af2d1eed5afa77005))

# [3.0.0](https://github.com/jkeen/ember-stereo/compare/v2.2.2...v3.0.0) (2022-02-02)

### Bug Fixes

- address double compute error in docs uncovered in 3.28 update ([8f274ae](https://github.com/jkeen/ember-stereo/commit/8f274aefc4b942900f271a9bab97a02e225b19f7))
- Use ember keyboard beta to resolve build issue on CI with ember-cli-addon-docs ([2c894a6](https://github.com/jkeen/ember-stereo/commit/2c894a66e21e8af65cde29e17669e9f290920321))

### chore

- Update node requirements, dropping old support ([ece3c4e](https://github.com/jkeen/ember-stereo/commit/ece3c4e0678395674e40d57c71f71f72670eca15))

### Features

- Now works in apps using ember-auto-import 2. The path to the future is a bumpy one. ([26cb228](https://github.com/jkeen/ember-stereo/commit/26cb22894c8a73e8780d9eb617d57a9ceb812f88))

### BREAKING CHANGES

- node 14.x + required
- ember-auto-import > 2 required now!

## [2.2.2](https://github.com/jkeen/ember-stereo/compare/v2.2.1...v2.2.2) (2022-01-20)

### Bug Fixes

- load audio after ensuring URL is not cached by the browser ([3ea70f9](https://github.com/jkeen/ember-stereo/commit/3ea70f94ace72da72f1286abf8939367987f5497))

## [2.2.1](https://github.com/jkeen/ember-stereo/compare/v2.2.0...v2.2.1) (2021-12-28)

### Bug Fixes

- Update HLS loading negotiation and correctly trigger audio-blocked event if play is blocked ([4add770](https://github.com/jkeen/ember-stereo/commit/4add770ce285696370f1d40299b4487269e54190))

# [2.2.0](https://github.com/jkeen/ember-stereo/compare/v2.1.2...v2.2.0) (2021-11-20)

### Bug Fixes

- Merge existing cached metadata when playing fresh sound ([2d88074](https://github.com/jkeen/ember-stereo/commit/2d880743bec24da5d488b9e19dc174dfc34bf9fd))

### Features

- Sound metadata is stored centrally now and will automatically update navigator.mediasession when changed, providing accurate now-playing info to iOS lock screens, etc ([848588b](https://github.com/jkeen/ember-stereo/commit/848588b6f92b03041ed457a76461544a13132fa6))

## [2.1.2](https://github.com/jkeen/ember-stereo/compare/v2.1.1...v2.1.2) (2021-11-19)

### Bug Fixes

- make isMobileDevice a tracked variable so volume-related logic works reliably ([e94dc6c](https://github.com/jkeen/ember-stereo/commit/e94dc6c23af469f9c50080477c4138eb2434baf0))

## [2.1.1](https://github.com/jkeen/ember-stereo/compare/v2.1.0...v2.1.1) (2021-11-19)

### Bug Fixes

- fail gracefully if findSound is passed an empty string ([69754d7](https://github.com/jkeen/ember-stereo/commit/69754d72e0b24590ae3be0e0bfcefcb3283fb8ff))

# [2.1.0](https://github.com/jkeen/ember-stereo/compare/v2.0.10...v2.1.0) (2021-11-19)

### Bug Fixes

- resolved infinite invalidation loop caused by faulty soundproxy task. Updated dependencies ([f830a88](https://github.com/jkeen/ember-stereo/commit/f830a887a95ff2676a8a102691cb8decb376f696))

### Features

- add {{stereo-volume-is-adjustable}} helper, which returns whether or not the device supports adjusting volume at the sound level ([a41e759](https://github.com/jkeen/ember-stereo/commit/a41e759b0ff4580f6700ba02f96a65482b61110c))

## [2.0.10](https://github.com/jkeen/ember-stereo/compare/v2.0.9...v2.0.10) (2021-11-08)

### Bug Fixes

- fix {{sound-position-slider}} modifier gestures ([9c48a18](https://github.com/jkeen/ember-stereo/commit/9c48a18980a55b72671b372848f0f143adf35ed6))
- update {{sound-position-progress}} bar on audio-position-will-change event as well as audio-position-changed event ([4dcea0d](https://github.com/jkeen/ember-stereo/commit/4dcea0dc86ae9ef284f204034c0b7e74e4cd5a2a))

## [2.0.9](https://github.com/jkeen/ember-stereo/compare/v2.0.8...v2.0.9) (2021-10-13)

### Bug Fixes

- load HLS fragment on position change if changed to surface correct PROGRAM-DATE-TIME if available ([5d40d57](https://github.com/jkeen/ember-stereo/commit/5d40d57e524920300f4289f57884949c1b53b471))

## [2.0.8](https://github.com/jkeen/ember-stereo/compare/v2.0.7...v2.0.8) (2021-09-22)

### Bug Fixes

- allow id3 metadata to be accessed on any type of sound ([5eec65d](https://github.com/jkeen/ember-stereo/commit/5eec65d8b48328432a03c7173558cd6cdc7557e2))

## [2.0.7](https://github.com/jkeen/ember-stereo/compare/v2.0.6...v2.0.7) (2021-09-19)

### Bug Fixes

- safely check systemStereoOptions incase it's not set and we're going full defaults ([cf21113](https://github.com/jkeen/ember-stereo/commit/cf2111375375c8943e6653fcf007294f5b9beed2))

## [2.0.6](https://github.com/jkeen/ember-stereo/compare/v2.0.5...v2.0.6) (2021-09-11)

### Bug Fixes

- Fire audio-ended event when fixed length audio ends using HLS connection ([f3d66b0](https://github.com/jkeen/ember-stereo/commit/f3d66b0599856944c4255f6c7749e022210e2942))

## [2.0.5](https://github.com/jkeen/ember-stereo/compare/v2.0.4...v2.0.5) (2021-09-08)

## [2.0.4](https://github.com/jkeen/ember-stereo/compare/v2.0.3...v2.0.4) (2021-09-04)

## [2.0.3](https://github.com/jkeen/ember-stereo/compare/v2.0.2...v2.0.3) (2021-09-04)

### Chores

- update semantic release settings some more [skip ci] ([c234bc5](https://github.com/jkeen/ember-stereo/commit/c234bc5f8e246e385e05775b700b71b6ff026dcf))
- **release:** 2.0.2 [skip ci] ([a95d670](https://github.com/jkeen/ember-stereo/commit/a95d670042f8664bed78a78ec32e395334c9de8e))

### Documentation

- update demo audio url ([085e2c0](https://github.com/jkeen/ember-stereo/commit/085e2c0e21fd48dd6881406a6278d55c3c2d7e4a))

### Miscellaneous

- Fix changelog location for semantic-release [skip ci] ([2b86c9f](https://github.com/jkeen/ember-stereo/commit/2b86c9ff7dcb3182f324d6847773d8c4d81f14d8))

# ember-stereo changelog

## [2.0.2](https://github.com/jkeen/ember-stereo/compare/v2.0.1...v2.0.2) (2021-09-04)

### Bug Fixes

- expose currentTime on the service and the base sound ([14103e9](https://github.com/jkeen/ember-stereo/commit/14103e914045c82fa242dd7f99884acee8c8d988))

### Documentation

- Update documentation and examples for using the test helpers ([f99e987](https://github.com/jkeen/ember-stereo/commit/f99e987f197ebd4e6f34591c47bff488d0f5a674))

## 2.0.1 (2021-09-04)

### Documentation

    * Correct some confusing bits, add some clarity to plain ol' readme, update license and CI docs release settings

### 2.0 (September 4, 2021)

- [IMPROVEMENT] Added helpers and modifiers to operate hifi only from templates, removing a huge hurdle for newcomers having to deal with audio ids
- [BREAKING CHANGE] audio events now fire an object as the first argument, with the `sound`, matching the `play` and `load` functions. All event listeners should change from `this.stereo.on('event-name', (sound) => { // handler })` to `this.stereo.on('event-name', ({sound}) => { // handler })`
- [CHANGE] Default volume is now 100
- [CHANGE] Audio errors are handled way better, can be surfaced in a template through `{{sound-is-errored}}` and `{{sound-error-details}}`, and thrown errors can be silenced with a `silenceErrors` given to `play()` or `load()`
- [CHANGE] Sounds now know where they've been blocked by autoplay, and the stereo service does too. `audio-blocked` is the event to tie into. See [here](https://ember-stereo.com/docs/autoplay)
- [CHANGE] Sounds are cached ignoring query strings
- [IMPROVEMENT] HLS now provides `currentTime` property for HLS streams that include EXT-PROGRAM-DATE-TIME in their manifests
- [BREAKING CHANGE] Renamed anything that was `hifi` to `stereo`
- [BREAKING CHANGE] Upgrade to Ember 3.27. This addon is octane-only now
- [CHORE] Complex promise/event waiting loops that were prone to error and hard to test have been replaced with ember concurrency tasks
- [IMPROVEMENT] Interactive documentation at https://ember-stereo.com/

# FORKED from ember-hifi

### 1.18 (September 29, 2020)

- [IMPROVEMENT] Trigger an event when an HLS stream's ID3 timed metadata changes (#89)

### 1.17 (April 15, 2020)

- [CHORE] Remove jQuery dependency, bump other dependencies
- [CHORE] Upgrade to Ember 3.10, improve tests

### 1.16 (June 16, 2019)

- [IMPROVEMENT] Add togglePause method to hifi service
- [IMPROVEMENT] Add the long overdue change from @gmurphey to the build process [#43]
- [BUGFIX] Fix duration calculation for HLS streams, fixing [#55]
- [BUGFIX] Move ember copy to dependencies [#54]

### 1.15.2 (September 24, 2018)

- [CHORE] replace deprecated Ember.Copy
- [CHORE] replace deprecated EmberMap
- [CHORE] add missing semicolons [#52](https://github.com/nypublicradio/ember-hifi/pull/52)

### 1.15.1 (June 12, 2018)

- [BUGFIX] moves `pre-load` event so it doesn't interfere with `soundCache` keys

### 1.15.0 (June 11, 2018) ☀️

- [IMPROVEMENT] Adds `pre-load` event to hifi service with successful strategy

### 1.14.1 (February 13, 2018) ❤️

- [CHORE] Add some docs
- [IMPROVEMENT] Adds `currentMetadata` computed property is updated synchronously with calls to `play`

### 1.14.0 (December 13, 2017) 🕎

- [IMPROVEMENT] Upgrade to ember 2.17

### 1.13.0 (October 30, 2017) 🎃

- [IMPROVEMENT] Adds a `positionInterval` option so consuming apps can control how often `hifi.position` is updated. This allows e.g. a smoother position animation for shorter audio.

### 1.12.1 (October 18, 2017)

This release is just a version number change so I can publish to npm. 1.12.0 was already published accidentally on June 27.

### 1.12.0 (October 18, 2017)

- [IMPROVEMENT] Pass config-level `options` object to Howler instances during init

### 1.11.4 (August 30, 2017)

- [BUGFIX] Native Audio sounds weren't firing their `audio-loaded` event. Fix it!

### 1.11.3 (August 15, 2017)

- [BUGFIX] Stop dummyHifi ticking after an audio-end signal, which can cause audio-end signals to continue sending for all eternity leaving tests to wait.

### 1.11.2 (August 4, 2017)

- [BUGFIX] Remove IE11 workarounds. The issue these corrected has since been fixed by more robust event handling by hifi. This also fixes issues with upstream apps waiting for `pause` events, since finished sounds would also fire pause events.

### 1.11.1 (June 27, 2017)

- [BUGFIX] Fix a test by using `checkWaiters`
- [IMPROVEMENT] Docs deploys should be more reliable now with the `--pure-lockfile` flag
- [IMPROVEMENT] Remove unneeded ember-power-select addons

### 1.11.0 (June 26, 2017)

- [IMPROVEMENT] `ember-hifi` no longer adds bower dependencies. Thanks to [@gmurphey](https://github.com/gmurphey) for [#41](https://github.com/nypublicradio/ember-hifi/pull/41). See [Upgrading](https://github.com/nypublicradio/ember-hifi#upgrading-from--1110) for more.

### 1.10.1 (June 4, 2017)

- Quieted most of the logging messages for how to handle special urls when using dummyHifi

### 1.10 (June 1, 2017)

- [IMPROVEMENT] Improved dummyHifi service to better mimic a real sound.
- [IMPROVEMENT] Added `new-load-request` and `current-sound-interrupted` on the service.
- [IMPROVEMENT] Added `audio-position-will-change`, `audio-will-rewind`, and `audio-will-fast-forward` on the Base sound.
- [BUGFIX] Fixed opera bug where native audio element with a stream source didn't report as having Infinity duration

### 1.9.1 (May 12, 2017)

- [BUGFIX] `hifiNeeds` test helper didn't include all needed services (it was missing `service:poll`)

### 1.9.0 (May 10, 2017)

- [IMPROVEMENT] Changed API (and documented) `current-sound-changed` to `(currentSound, previousSound)` from `({previousSound, currentSound})` to be more consistent with the other APIs.
- [BUGFIX] Make sure events of the not-yet-current sound are relayed through hifi. Previously current sound would be set on `audio-played`, and that `audio-played` event wasn't relayed through the service.
- [BUGFIX] Fix pause event so it gets triggered properly when using a shared audio element. Previously, when ownership of the audio element was transferred between sounds, the sound releasing control did not properly trigger a pause event on the service.
- Upgrade to eslint and yarn.

### 1.8.0 (April 19, 2017)

- [#35](https://github.com/nypublicradio/ember-hifi/pull/35) [IMPROVEMENT] - Add another method to get around iOS autoplay restrictions. If on mobile, we now add a document `touchstart` listener that will trigger a play on touch if the sound hasn't played yet.
- [#34](https://github.com/nypublicradio/ember-hifi/pull/34) [IMPROVEMENT] - Add service level 'current-sound-changed' event, and allowed metadata to be attached to sound at play time so consumers can retrieve it later

### 1.7.4 (March 15, 2017)

- [#31](https://github.com/nypublicradio/ember-hifi/pull/31) [BUGFIX] - Wire up DummyConnection to fire real events
- f4678a2 Re enable canary because it passes now
- [#32](https://github.com/nypublicradio/ember-hifi/pull/32) [IMPROVEMENT] - Don't resolve `.play` until the chosen sound actually fires its `audio-played` event, so that the service can properly expose its aliased computed props.
- 2deba6d [IMPROVEMENT] - Tweak `included` hook so that `ember-hifi` can be nested under other addons.

### 1.7.3 (March 1, 2017)

- [BUGFIX] Fix my goof from yesterday and use preload='none' instead of not having the src, since IE freaks out about the latter.

### 1.7.2 (February 28, 2017)

- [BUGFIX] Resolve issue where two requests would happen for one piece of audio when using a shared audio element. We don't save the src on the shadowAudio element when saving audio state anymore, and it turns out that wasn't instantly resuming audio when switching between audio sources like we thought it was anyway.

### 1.7.1 (February 15, 2017)

- [BUGFIX] Fixed error that was getting thrown in the logging and causing a strange error when debugging was enabled
- [BUGFIX] Fix out of sync loading indicators by forcing notifyPropertyChanges with isLoading.

### 1.7.0 (February 3, 2017)

- [BUGFIX] Don't autoplay the blank audio element on desktop browsers if using a single audio element. IE can't deal with it, and audio will start playing before events are wired up. Also handle case where IE errors after trying to set `.currentTime` on the audio element.
- [IMPROVEMENT] - Refactoring debug logger and included better debug messages, especially around transferring of audio control when using a single audio element.
- [BUGFIX] Don't set isLoading flag to false right away after retreiving a sound from the cache. This fixes a problem where after resuming audio from a stopped stream `hifi` would report `isLoading = false`, making buttons show up as playing when it was really loading stuff up again.
- Updated ember try scenarios and fix some deprecation warnings.

### 1.6.0 (January 26, 2017)

- 3433e18 - `alwaysUseSingleAudioElement: true` in the emberHIfi config will now force hifi to use a single shared audio element all the time, instead of just on mobile browsers as is done normally. This resolves an issue with cookied content providers that limit one connection per client (in this case, adswizz on wnyc) where without this option audio might stall out when switching between different audio resources.
- set `isDevelopingAddon` to `false`, since this is released.
- Fixed some test failures on ember-beta and ember-canary

### 1.5.0 (November 14, 2016)

- dbc80f4 [BUGFIX] - gets rid of 'audio-stopped' event, which wasn't in use. replace it with 'audio-ended' and make sure Howler sends the correct event. Thanks to @aaronfischer for bringing it up, even though the bug he was experiencing turned to be a server-side thing.
- 0574a94 [BUGFIX] - only track internal audio element state if we're on mobile. fixes bad playback behavior on firefox.
- [IMPROVEMENT] - Allow passing in of event callbacks. Useful for testing.
- Update to ember 2.9.1

### 1.4.1 (October 31, 2016) :pumpkin:

- start dummy connections with a 0 position

### 1.4.0 (October 31, 2016) :pumpkin:

- 3a9438 [BUGFIX] - Handle audio position overruns
- 460149 [IMPROVEMENT] - `.play` on the Service and Connections accepts an options hash. The only option currently supported is `position`, so you can `sound.play({position: 0})` to restart a sound.
- Change when some properties are updated for snappier feedback
- [#18](https://github.com/nypublicradio/ember-hifi/pull/18) [IMPROVEMENT] - Adds a `SharedAudioAccess` library to manage access to a singleton HTML5 Audio element on mobile devices. This is due to the long-standing iOS issue with calling `play` on an audio element that is not in direct response to a user action like a `click` or `tap`. This allows us to do things like playlist playback on mobile.
- Other improvements: include silent MP3 files for testing, fix soundcache issue caching identical sounds more than once.

### 1.3.3 (October 19, 2016)

- Attaches failures to load `catch` case

### 1.3.2 (October 19, 2016)

- Fixes `percentLoaded` attr on native audio connection

### 1.3.1 (October 19, 2016)

- [#17](https://github.com/nypublicradio/ember-hifi/pull/17) [BUGFIX] - Improves stream pausing
- Test & deprecation warning cleanup
- 9fd95bb Manually manage `isLoading` state in a couple spots

### 1.3.0 (October 14, 2016)

- Add 'isErrored' boolean property and 'error' string property to sounds as a first step of being able to recover from play errors

- Go back to setting the `src` property on native audio to an empty string instead of a blob, and just mute the audio errors when we've explicitly stopped loading

- [#15](https://github.com/nypublicradio/ember-hifi/issues/15) [BUGFIX] - Cache sounds correctly when the url is specified as a hash with the mimeType.

### 1.2.3 (October 12, 2016)

- Fixing event relaying logic so that handlers won't be registered more than once, causing multiple relay calls to be sent for for a single sound event. This was problematic with the `audio-ended` event, causing tracks to get skipped in a playlist.

### 1.2.2 (October 11, 2016)

- Set isLoading flag when reloading audio after being stopped

### 1.2.1 (October 11, 2016)

- Added a 'loadeddata' event listener to Native Audio, since Firefox doesn't trigger a 'canplay' until after you've asked the audio to play.

- Suppressed occasional invalid audio errors while Native Audio was stopped and the src attribute was changed to prevent loading.

### 1.2.0 (October 6, 2016)

- Renamed some internal services and added a unit test helper for adding `needs` (so consumers don't have to know about the internal services) since Ember doesn't have a great solution for that yet.

### 1.1.4 (October 5, 2016)

- Explicitly stop the audio after playback has ended for IE11, who never learned to communicate properly.

### 1.1.3 (October 4, 2016)

- Improved logic to prevent browser from loading a paused stream on the native audio connection. Instead of setting <audio> src to empty, we now set it to an empty blob so the audio element won't throw an error on pause (on mobile), which caused issues when switching between different audio streams.
- Increased timeout for mobile click blocker to 2s due to some false positives

### 1.1.2 (October 4, 2016)

- Added toggleMute method on the service for easy mute toggling

### 1.1.1 (September 29, 2016)

- [#11](https://github.com/nypublicradio/ember-hifi/issues/11) [BUGFIX] Use the ember run loop so the pause event gets fired correctly when stopping NativeAudio.
- [#12](https://github.com/nypublicradio/ember-hifi/issues/12) [BUGFIX] Fix issue with .aac files returning a mime-type of audio/x-aac, then causing the (Native Audio) audio element to think it can't play aac files

### 1.1.0 (September 26, 2016)

- [#9](https://github.com/nypublicradio/ember-hifi/pull/9) [BUGFIX] Pause streams by setting `src` attribute of Nativ Audio element to the empty string rather than using `removeAttribute`.
- [#10](https://github.com/nypublicradio/ember-hifi/pull/10) Use mime types to determine connection support for a given audio url. If a mime type cannot be derived, try it anyway but warn the user about performance implications.
- Increases timeout on CircleCI for test runs
- Removes `ember-poll` as a duplicate dependency

### 1.0.2 (September 20, 2016)

- Skips 1.0.1 because I've never used `npm publish` before.
- Updates package.json with correct `ember-poll` dependency and adds a repo URL.

### 1.0.0 (September 16, 2016)

- Initial release. See [README.md](https://github.com/nypublicradio/ember-hifi/blob/master/README.md) for more.
