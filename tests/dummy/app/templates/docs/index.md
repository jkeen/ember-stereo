# Introduction
`ember-hifi` provides an easy way to manage audio in your ember app with reliable states, useful events, direct controls and a nice API to interact directly with playing and paused sounds.

## Hifi 2.0 changes
With Hifi 1.x, it was necessary to interact with the hifi service directly. Hifi 2.0 adds several template helpers and modifiers making it possible to operate audio without ever interacting with the `hifi` service directly.
## High level overview
The `hifi` service manages loading and playing sounds, making sure that only one sound plays at at time, setting volume, and providing system-level events. 

Hifi `connections` are factory classes that plug into hifi and know how to load particular sound types. Hifi includes three default connections:
  - a `native-audio` connection that uses the native `audio` element. This is prioritized automatically on mobile devices.
  - a `howler` connection that uses howler.js
  - an `hls` connection to play .hls streams.

Different devices have different audio capabilities, so given a url the `hifi` service will try each loaded connection until one succeeds by returning a `sound` object.
