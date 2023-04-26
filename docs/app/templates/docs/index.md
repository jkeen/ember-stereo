### **`ember-stereo`**

<span class="text-xl">is an addon that makes it easy to reactively handle all sorts of audio files in your ember octane app.</span>

<Docs::AttentionGetter />

# Install

```shell
ember install ember-stereo
```

## History

This project started as [`ember-hifi`](http://github.com/nypublicradio/ember-hifi) in 2016, an open source audio library funded by New York Public Radio and built by me ([Jeff Keen](http://github.com/jkeen)) and my pal and former WNYC engineer [Brian Whitton](http://github.com/noslouch). `ember-hifi` still powers most of NY Public Radio's web sites, but as of this writing most of those sites are still tied to ember classic and I wanted to move past that.

Over the past year or so I've been refactoring hifi to be more reactive, updating it for modern Ember, reducing the barrier to entry (like, a lot), and solving some longer-standing gotchas. The changes in direction were big enough warrant a fresh start. Ta-da! Stereo.
