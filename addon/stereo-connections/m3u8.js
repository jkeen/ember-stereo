import BaseSound from 'ember-stereo/stereo-connections/base';
import Ember from 'ember';
import { assert } from '@ember/debug'
import NativeAudio from './native-audio';
import { tracked } from '@glimmer/tracking';

/*

#EXTM3U
#EXT-X-VERSION:4
#EXT-X-MEDIA-SEQUENCE:1624208400
#EXT-X-ALLOW-CACHE:NO
#EXT-X-TARGETDURATION:10
#EXT-X-START:TIME-OFFSET=0
#EXTINF:10.027,
#EXT-X-PROGRAM-DATE-TIME:2021-06-20T17:00:00+00:00
https://playback.dubbletrack.com/koop/1/segments/2021/06/20/17/00/T1624208400000G1624085397000D10027.aac?expires=1625418000&token=0y2pCJnbDbjrK6rV0iTEpqCfe_8zT5YZ2qpCq8xxxUM
https://playback.dubbletrack.com/koop/1/segments/2021/06/20/17/00/T1624208410000G1624085397000D9899.aac?expires=1625418000&token=zhETCZDyhVRh_zgS4ZKp_7XSDJsU7hLwNRmBPiTny-M
https://playback.dubbletrack.com/koop/1/segments/2021/06/20/17/00/T1624208420000G1624085397000D10069.aac?expires=1625418000&token=T0JLMtQIUAdFnUgxj5BEhfSjEZC-pOT3kNuH9Y-kVc4
https://playback.dubbletrack.com/koop/1/segments/2021/06/20/17/00/T1624208430000G1624085397000D10069.aac?expires=1625418000&token=UvHV5iF0thRXpUcAbQxtS8o8qJVvH1tgSVa4k1n0GRo
https://playback.dubbletrack.com/koop/1/segments/2021/06/20/17/00/T1624208440000G1624085397000D9941.aac?expires=1625418000&token=teszL5Fzgz_MQGdfFGeN2UTV74AHEOVOUX2fJN0RUZE
https://playback.dubbletrack.com/koop/1/segments/2021/06/20/17/00/T1624208450000G1624085397000D9984.aac?expires=1625418000&token=srXjnqk-hoK2nEFXcyjpXsP0ott9oegV2Khp-gVkw8Y
https://playback.dubbletrack.com/koop/1/segments/2021/06/20/17/01/T1624208460000G1624085397000D9984.aac?expires=1625418000&token=0BF4Fitr22If9XXzlem5B980ka5rUpu0psFPUW6ovvw
https://playback.dubbletrack.com/koop/1/segments/2021/06/20/17/01/T1624208470000G1624085397000D9941.aac?expires=1625418000&token=cx_dWIwMUjZMWXz5n8ubm9QR8v3xz1EGcpwuYwnOm4s
https://playback.dubbletrack.com/koop/1/segments/2021/06/20/17/01/T1624208480000G1624085397000D10069.aac?expires=1625418000&token=98coYEGo9TRWHJwk_IeHAfLr7TIfOx6xLFiwmHJgWx0
https://playback.dubbletrack.com/koop/1/segments/2021/06/20/17/01/T1624208490000G1624085397000D9941.aac?expires=1625418000&token=xrNWxL9sEU0N1RMqnQedwABCFAgPy6w10kO4RBA_4HM



*/


/**
* This class connects with the native audio element to create sounds.
*
* @class M3U8
* @extends BaseSound
* @constructor
*/
export default class M3U8Audio extends BaseSound {
  static canPlayMimeType(mimeType) {
    let audio = new Audio();
    // it returns "probably" and "maybe". Both are worth trying. Empty is bad.
    return (audio.canPlayType(mimeType) !== "");
  }

  static key = 'M3U8Audio';
  static toString() {
    return 'M3U8 Audio';
  }

  @tracked segmentUrls

  async setup() {
    // READ m3u8 manifest

    this.segmentUrls = [
      "https://playback.dubbletrack.com/koop/1/segments/2021/06/20/17/00/T1624208400000G1624085397000D10027.aac?expires=1625418000&token=0y2pCJnbDbjrK6rV0iTEpqCfe_8zT5YZ2qpCq8xxxUM",
      "https://playback.dubbletrack.com/koop/1/segments/2021/06/20/17/00/T1624208410000G1624085397000D9899.aac?expires=1625418000&token=zhETCZDyhVRh_zgS4ZKp_7XSDJsU7hLwNRmBPiTny-M",
      "https://playback.dubbletrack.com/koop/1/segments/2021/06/20/17/00/T1624208420000G1624085397000D10069.aac?expires=1625418000&token=T0JLMtQIUAdFnUgxj5BEhfSjEZC-pOT3kNuH9Y-kVc4",
      "https://playback.dubbletrack.com/koop/1/segments/2021/06/20/17/00/T1624208430000G1624085397000D10069.aac?expires=1625418000&token=UvHV5iF0thRXpUcAbQxtS8o8qJVvH1tgSVa4k1n0GRo",
      "https://playback.dubbletrack.com/koop/1/segments/2021/06/20/17/00/T1624208440000G1624085397000D9941.aac?expires=1625418000&token=teszL5Fzgz_MQGdfFGeN2UTV74AHEOVOUX2fJN0RUZE",
      "https://playback.dubbletrack.com/koop/1/segments/2021/06/20/17/00/T1624208450000G1624085397000D9984.aac?expires=1625418000&token=srXjnqk-hoK2nEFXcyjpXsP0ott9oegV2Khp-gVkw8Y",
      "https://playback.dubbletrack.com/koop/1/segments/2021/06/20/17/01/T1624208460000G1624085397000D9984.aac?expires=1625418000&token=0BF4Fitr22If9XXzlem5B980ka5rUpu0psFPUW6ovvw",
      "https://playback.dubbletrack.com/koop/1/segments/2021/06/20/17/01/T1624208470000G1624085397000D9941.aac?expires=1625418000&token=cx_dWIwMUjZMWXz5n8ubm9QR8v3xz1EGcpwuYwnOm4s",
      "https://playback.dubbletrack.com/koop/1/segments/2021/06/20/17/01/T1624208480000G1624085397000D10069.aac?expires=1625418000&token=98coYEGo9TRWHJwk_IeHAfLr7TIfOx6xLFiwmHJgWx0",
      "https://playback.dubbletrack.com/koop/1/segments/2021/06/20/17/01/T1624208490000G1624085397000D9941.aac?expires=1625418000&token=xrNWxL9sEU0N1RMqnQedwABCFAgPy6w10kO4RBA_4HM"
    ]
  }

  _setVolume() {
    assert("[ember-stereo] #_setVolume interface not implemented", false);
  }

  _audioDuration() {
    assert("[ember-stereo] #_audioDuration interface not implemented", false);
  }

  _currentPosition() {
    assert("[ember-stereo] #_currentPosition interface not implemented", false);
  }

  _setPosition() {
    assert("[ember-stereo] #_setPosition interface not implemented", false);
  }

  play() {
    assert("[ember-stereo] #play interface not implemented", false);
  }

  pause() {
    assert("[ember-stereo] #pause interface not implemented", false);
  }

  stop() {
    assert("[ember-stereo] #stop interface not implemented", false);
  }

}
