
export const WNYC_AAC_STREAM = {
  title: 'WNYC Live Stream (aac)',
  url: 'https://fm939.wnyc.org/wnycfm.aac',
};

export const WNYC_HLS_STREAM = {
  title: 'WNYC Live Stream (hls)',
  url: 'https://hls-live.wnyc.org/wnycfm/playlist.m3u8',
}

export const MP3_ON_DEMAND_2 = {
  title: 'Brian Lehrer Show (mp3)',
  url: 'https://audio.wnyc.org/bl/bl011421dpod.mp3',
}

export const MP3_ON_DEMAND = {
  title: 'On The Media (mp3)',
  url: 'https://www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/otm/otm04212017pod.mp3',
};

export const STREAM_WITHOUT_EXTENSION = {
  title: 'WQXR Live Stream (no mime type)',
  url: 'https://stream.wqxr.org/wqxr',
};

export const KOOP_STREAM = {
  title: "KOOP Live Stream (aac)",
  url: "https://streaming.koop.org/stream.aac"
}

export const INVALID_STREAM = {
  title: "Invalid Stream",
  url: "https://streaming.koop.org/streamz.mp3"
}

export const OGG_FILE = {
  title: "Test Sound (ogg)",
  url: "https://file-examples-com.github.io/uploads/2017/11/file_example_OOG_1MG.ogg"
}

export const OGG_WITH_CORS = {
  title: "Test Sound 2 (ogg)",
  url: "https://filesamples.com/samples/audio/ogg/sample4.ogg"
}

export const KUT_STREAM = {
  title: "KUT (aac)",
  url: "https://kut.streamguys1.com/kut-web.aac"
}

export const KUTX_STREAM = {
  title: "KUTX (aac)",
  url: "https://kut.streamguys1.com/kutx-free.aac"
}

export const HLS_LIVE_STREAM = {
  title: "KUTX Live Stream (hls)",
  url: "https://kut-hls.streamguys1.com/kutx/playlist.m3u8",
}

export const HLS_FIXED_TEST = {
  title: 'HLS Fixed Test',
  url: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
}

let testSounds = [
  KUT_STREAM,
  KOOP_STREAM,
  OGG_WITH_CORS,
  OGG_FILE,
  KUTX_STREAM,
  WNYC_HLS_STREAM,
  WNYC_AAC_STREAM,
  MP3_ON_DEMAND_2,
  MP3_ON_DEMAND,
  HLS_FIXED_TEST,
  HLS_LIVE_STREAM,
  STREAM_WITHOUT_EXTENSION,
  INVALID_STREAM
].map(sound => {
  sound.urlObject = {
    url: sound.url
  }
  sound.urlPromise = new Promise((resolve) => {
    setTimeout(() => {
      console.log(`resolving promise: ${sound.url}`)
      resolve({ url: `${sound.url}` })
    }, 2000)
  })

  return sound;
})


// let testSoundObjects = testSounds.map(sound => {
//   return {
//     url: `${sound.url}`
//   }
// });

// let testSoundPromises = testSounds.map(sound => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log(`resolving promise: ${sound.url}`)
//       resolve({url: `${sound.url}`})
//     }, 2000)
//   })
// });


export default testSounds

// export {
//   testSounds, testSoundPromises, testSoundObjects
// }

