ember-stereo changelog

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
