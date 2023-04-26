# Audio formats

Different browsers support different [audio formats](https://caniuse.com/?search=audio%20format), and unless you're trying to play something universally supported like `mp3s`, things can get tricky.

I think [`opus/ogg`](<https://en.wikipedia.org/wiki/Opus_(audio_format)>) is a fantastic audio format, but Safari (and there by iOS) doesn't care about it at all. On the flip side, `HLS` is a fantastic protocol for live streaming audio, but _only_ Safari supports it natively and the fantastically full featured HLS player (which `stereo` provides a connection for) [`hls.js`](https://github.com/video-dev/hls.js/) can run everywhere _except_ on Safari/iOS. What I'm saying is trying to do anything fancy with audio on the web can still be painful.

You might prefer that you serve listeners slimmer `.ogg` files or `hls` streams over `.mp3s` without having to keep track of the current mess I described above.

### This is how you do it

Provide `stereo` an array of urls in preferential order and it'll try each url on each loaded connection and quit once it succeeds.

To illustrate let's try and play this [(incredible) digitized in-store cassete tape from K-Mart in 1989](https://archive.org/details/KmartOctober1989) from archive.org. The `ogg` version of this file is `60M`, the `mp3` version is `200M`. Woof! Obviously, the higher quality `60M` file would be preferable.

<Docs::TryMultipleUrls />

Looks like you're running <Docs::CurrentBrowser /> on <Docs::CurrentOs />

### Ogg

Here's what <Docs::CurrentBrowser /> for <Docs::CurrentOs /> told `ember-stereo` about the chances of this `ogg` file succeeding.

<Docs::StrategyBreakdown @identifier="https://archive.org/download/KmartOctober1989/Kmart%20October%201989.ogg"/>
<Docs::StereoPlayer @identifier="https://archive.org/download/KmartOctober1989/Kmart%20October%201989.ogg"/>

### Mp3

This for sure works on <Docs::CurrentBrowser /> for <Docs::CurrentOs />. Nothing to get excited about, but here's the details anyway:

<Docs::StrategyBreakdown @identifier="https://archive.org/download/KmartOctober1989/Kmart%20October%201989.mp3"/>
<Docs::StereoPlayer @identifier="https://archive.org/download/KmartOctober1989/Kmart%20October%201989.mp3"/>
