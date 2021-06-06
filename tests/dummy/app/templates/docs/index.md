# Introduction
`ember-stereo` provides an easy way to manage audio in your ember app with reliable states, useful events, direct controls and a nice API to interact directly with playing and paused sounds.

## Ember Stereo 2.0 changes
Ember Stereo 2.0 introduces some major structrual changes that make interacting with audio in your ember app even easier. Previously in `ember-hifi` you had to know a thing or two about what was happening behind the scenes in the hifi service in order to handle things like displaying when a particular sound was playing (checking if urls matched, etc etc). Now all this has been abstracted away for the most part and you can now call template helpers to do it all. 

## History
This project started as `ember-hifi` in 2016, an open source audio library funded by New York Public Radio and built by @jkeen and @noslouch. `ember-hifi` still powers most of NY Public Radio's web sites, but as of this writing most of their sites are still tied to ember classic. Over the past year or so I've been upgrading hifi, reducing the barrier to entry, and solving some longer-standing gotchas. Now the changes and direction is different enough to warrant a fresh start and a name change.



