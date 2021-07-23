# Trying multiple formats

Different browsers support different [audio formats](https://caniuse.com/?search=audio%20format), and you might prefer that you serve listeners .ogg files over .mp3s without having to keep track of which browsers support which file types. It's easy to do that by providing `stereo` an array of urls in preferential order—it'll check which files can play and will return the first one that works.

{{docs/try-multiple-urls}}
