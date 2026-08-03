# HLS fixtures

Three playlist shapes the HLS connection has to tell apart. Only the tags
differ, which is the whole point.

| file | `#EXT-X-ENDLIST` | `PLAYLIST-TYPE` | `MEDIA-SEQUENCE` | what it stands for |
|---|---|---|---|---|
| `vod.m3u8` | yes | `VOD` | 0 | a finished recording |
| `event-timestamped.m3u8` | no | `event` | 1785700784 | a show still airing, kept from its start — seekable, with a real length |
| `sliding-live.m3u8` | no | absent | 4 | a live edge that drops what it has aired — endless, only the window survives |

The middle one carries the header an encoder in the wild actually ships, which
differs from ffmpeg's in ways that matter: the playlist type arrives lowercase
(hls.js upper-cases it while parsing), the media sequence is derived from a
timestamp rather than counted from zero, and every segment carries a
`PROGRAM-DATE-TIME`. So an append-only playlist is not one whose media sequence
*is* zero — it's one whose media sequence never moves.

The segments these reference aren't in the repo, and the tests don't need them:
hls.js sizes the media from the `EXTINF` durations at parse time, so everything
the connection concludes about duration and seekability is settled before a
segment is fetched.

## Playing them for real

Reading what a browser reports needs audio to decode, so generate segments
first:

```sh
ffmpeg -re -f lavfi -i sine=frequency=440 -c:a aac -f hls -hls_playlist_type event event.m3u8
```

Strip the trailing `#EXT-X-ENDLIST` ffmpeg writes on exit from anything meant to
stand for a playlist still being written — that tag is what says otherwise — and
point the fixtures at the segments it produced.

## What each browser reports, measured

Only Safari plays these through the media element. Everywhere else HLS goes
through hls.js, and the two disagree about the same playlist:

| playlist | Safari, natively | after hls.js buffers it |
|---|---|---|
| `vod.m3u8` | `10.007` | `10.0078` |
| still being written | **`Infinity`** | **`10.0078`** |
| sliding live | `Infinity` | `10.0078` |

Safari says it doesn't know the length, which is what `NativeAudio` reads to
measure the sound rather than call it endless. hls.js sizes the MediaSource from
the segments it holds, so on that path the element says nothing about liveness
and only the playlist tags can separate these.

These fixtures are static, so nothing ever drops out of them and no seekable
range ever slides. A real sliding stream is the only way to see whether Safari's
range advances away from zero.
