# Browser Audio

Three things about audio on the web will bite you no matter which library you use: browsers disagree about formats, they block autoplay, and playback fails in ways you have to handle. `stereo` gives you a way through each.

## Audio formats

Different browsers support different [audio formats](https://caniuse.com/?search=audio%20format), and unless you're playing something universally supported like `mp3`, things get tricky.

[`opus/ogg`](<https://en.wikipedia.org/wiki/Opus_(audio_format)>) is a fantastic audio format, but Safari and iOS don't care about it at all. `HLS` is a fantastic protocol for live streaming, but only Safari supports it natively, and the full featured [`hls.js`](https://github.com/video-dev/hls.js/) player that `stereo` provides a connection for runs everywhere except Safari and iOS. Doing anything fancy with audio on the web is still painful.

You'd probably rather serve listeners slimmer `.ogg` files or `hls` streams than `.mp3s`, without tracking that mess yourself.

### This is how you do it

Give `stereo` an array of urls in preferential order. It tries each url on each loaded connection and stops once one works.

To illustrate, here's this [(incredible) digitized in-store cassette tape from K-Mart in 1989](https://archive.org/details/KmartOctober1989) from archive.org. The `ogg` version is `60M` and the `mp3` version is `200M`. Woof. The higher quality `60M` file is obviously preferable.

<Docs::TryMultipleUrls />

Looks like you're running {{docs/current-browser}} on {{docs/current-os}}

### Ogg

Here's what <Docs::CurrentBrowser /> for <Docs::CurrentOs /> told `ember-stereo` about the chances of this `ogg` file succeeding.

<Docs::StrategyBreakdown @identifier="https://archive.org/download/KmartOctober1989/Kmart%20October%201989.ogg"/>
<Docs::StereoPlayer @identifier="https://archive.org/download/KmartOctober1989/Kmart%20October%201989.ogg"/>

### Mp3

This for sure works on <Docs::CurrentBrowser /> for <Docs::CurrentOs />. Nothing to get excited about, but here are the details anyway:

<Docs::StrategyBreakdown @identifier="https://archive.org/download/KmartOctober1989/Kmart%20October%201989.mp3"/>
<Docs::StereoPlayer @identifier="https://archive.org/download/KmartOctober1989/Kmart%20October%201989.mp3"/>

## Autoplay restrictions

It used to be easy to play audio without autoplay blockers getting in the way. For those of us with good intentions, who aren't trying to do user-hostile things like play advertisements on page load, this is frustrating. Here's [Mozilla's guide on autoplay](https://developer.mozilla.org/en-US/docs/Web/Media/Autoplay_guide) for the details.

### Checking if autoplay is allowed

You might want to check whether autoplay is allowed in your listener's browser and take extra steps if it isn't. Here's how.

<Docs::AutoplayChecking />

### Gotchas

<Docs::AutoplayGotchas />

## Error handling

### Through the template

Template action helpers don't throw when playback fails. Instead you check whether a sound errored, using a couple of helpers.

<Docs::TemplateErrorsExample />

### Through the service

Interacting with the service, you handle errors the way you'd expect.

<Docs::ServiceErrorsTryCatch />
<Docs::ServiceErrorsTryThen />
<Docs::ServiceErrorsSilenceError />
<Docs::ServiceErrorsThrowError />
