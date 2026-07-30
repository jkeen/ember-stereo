export const WNYC_AAC_STREAM = {
  title: 'WNYC Live Stream (aac)',
  url: 'https://fm939.wnyc.org/wnycfm.aac',
};

export const WNYC_HLS_STREAM = {
  title: 'WNYC Live Stream (hls)',
  url: 'https://hls-live.wnyc.org/wnycfm/playlist.m3u8',
};

export const MP3_ON_DEMAND_2 = {
  title: 'Brian Lehrer Show (mp3)',
  url: 'https://audio.wnyc.org/bl/bl011421dpod.mp3',
};

export const MP3_ON_DEMAND = {
  title: 'On The Media (mp3)',
  url: 'https://www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/otm/otm04212017pod.mp3',
};

export const STREAM_WITHOUT_EXTENSION = {
  title: 'WQXR Live Stream (no mime type)',
  url: 'https://stream.wqxr.org/wqxr',
};

export const THE_CURRENT_STREAM = {
  title: 'The Current Live Stream (aac)',
  url: 'https://current.stream.publicradio.org/current.aac',
};

export const KOOP_STREAM = {
  title: 'KOOP Live Stream (aac)',
  url: 'https://streaming.koop.org/stream.aac',
};

export const INVALID_STREAM = {
  title: 'Invalid Stream',
  url: 'https://streaming.koop.org/streamz.mp3',
};

export const OGG_FILE = {
  title: 'Test Sound (ogg)',
  url: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Example.ogg',
};

export const OGG_WITH_CORS = {
  title: 'Test Sound 2 (ogg)',
  url: 'https://filesamples.com/samples/audio/ogg/sample4.ogg',
};

export const KEXP_STREAM = {
  title: 'KEXP (aac)',
  url: 'https://kexp-aacplus-64.streamguys1.com/kexp64.aac',
};

export const KLKT_STREAM = {
  title: 'KLKT Live Stream (mp3)',
  url: 'https://klkt.broadcasttool.stream/play',
};

export const WFMU_STREAM = {
  title: 'WFMU (mp3, no extension)',
  url: 'https://stream0.wfmu.org/freeform-128k',
};

export const HLS_FIXED_TEST = {
  title: 'HLS Fixed Test',
  url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
};

export const HLS_BIPBOP = {
  title: 'Apple BipBop (hls)',
  url: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_ts/master.m3u8',
};

export const KMART_SHOPPERS = {
  title: 'Attention K-Mart Shoppers',
  url: 'https://archive.org/download/KmartOctober1989/Kmart%20October%201989.ogg',
};

let testSounds = [
  KEXP_STREAM,
  KOOP_STREAM,
  THE_CURRENT_STREAM,
  OGG_WITH_CORS,
  KMART_SHOPPERS,
  OGG_FILE,
  KLKT_STREAM,
  WNYC_HLS_STREAM,
  WNYC_AAC_STREAM,
  MP3_ON_DEMAND_2,
  MP3_ON_DEMAND,
  HLS_FIXED_TEST,
  HLS_BIPBOP,
  WFMU_STREAM,
  STREAM_WITHOUT_EXTENSION,
  INVALID_STREAM,
].map((sound) => {
  sound.urlObject = {
    url: sound.url,
  };
  sound.urlPromise = new Promise((resolve) => {
    setTimeout(() => {
      console.log(`resolving promise: ${sound.url}`);
      resolve({ url: `${sound.url}` });
    }, 2000);
  });

  return sound;
});

export default testSounds;
