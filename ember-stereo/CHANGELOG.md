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
