
export const AAC_STREAM = {
  title: 'WNYC Live Stream (aac)',
  url: 'https://fm939.wnyc.org/wnycfm.aac',
  expectedValues: {
    url: 'https://fm939.wnyc.org/wnycfm.aac',
    duration: Infinity,
    connectionName: "NativeAudio",
    hasPlayed: false,
    isStream: true,
    isFastForwardable: false,
    isRewindable: false,
    position: 0
  }
};

export const HLS_STREAM = {
  title: 'WNYC Live Stream (hls)',
  url: 'https://hls-live.wnyc.org/wnycfm/playlist.m3u8',
  expectedValues: {
    url: 'https://hls-live.wnyc.org/wnycfm/playlist.m3u8',
    duration: Infinity,
    connectionName: "NativeAudio",
    hasPlayed: false,
    isStream: true,
    isFastForwardable: false,
    isRewindable: false,
    position: 0
  }
}

export const MP3_ON_DEMAND_2 = {
  title: 'Brian Lehrer Show (mp3)',
  url: 'https://audio.wnyc.org/bl/bl011421dpod.mp3',
  expectedValues: {
    url: 'https://audio.wnyc.org/bl/bl011421dpod.mp3',
    duration: Infinity,
    connectionName: "NativeAudio",
    hasPlayed: false,
    isStream: false,
    isFastForwardable: true,
    isRewindable: true,
    position: 0
  }
}

export const MP3_ON_DEMAND = {
  title: 'On The Media (mp3)',
  url: 'https://www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/otm/otm04212017pod.mp3',
  expectedValues: {
    url: 'https://www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/otm/otm04212017pod.mp3',
    duration: Infinity,
    connectionName: "NativeAudio",
    hasPlayed: false,
    isStream: false,
    isFastForwardable: true,
    isRewindable: true,
    position: 0
  }
};

export const STREAM_WITHOUT_EXTENSION = {
  title: 'WQXR Live Stream (no mime type)',
  url: 'https://stream.wqxr.org/wqxr',
  expectedValues: {
    url: 'https://stream.wqxr.org/wqxr',
    duration: Infinity,
    connectionName: "NativeAudio",
    hasPlayed: false,
    isStream: true,
    isFastForwardable: false,
    isRewindable: false,
    position: 0
  }
};

export const HLS_LIVE_STREAM = {
  title: "KUTX Live Stream  (hls)",
  url: "https://kut-hls.streamguys1.com/kut2/playlist.m3u8",
  expectedValues: {
    duration: Infinity,
    connectionName: "HLS",
    hasPlayed: false,
    isStream: true,
    isFastForwardable: false,
    isRewindable: false,
    position: 0
  }
}

export const KOOP_STREAM = {
  title: "KOOP Live Stream (aac)",
  url: "https://streaming.koop.org/stream.mp3"
}

export const INVALID_STREAM = {
  title: "Invalid Stream",
  url: "https://streaming.koop.org/streamz.mp3"
}

export const OGG_FILE = {
  title: "Test Sound (ogg)",
  url: "https://file-examples-com.github.io/uploads/2017/11/file_example_OOG_1MG.ogg"
}

export default [
  AAC_STREAM,
  HLS_STREAM,
  MP3_ON_DEMAND_2,
  MP3_ON_DEMAND,
  HLS_LIVE_STREAM,
  STREAM_WITHOUT_EXTENSION,
  KOOP_STREAM,
  OGG_FILE,
  INVALID_STREAM
]
