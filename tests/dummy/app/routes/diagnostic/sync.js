import Route from '@ember/routing/route';
import testSounds from 'dummy/utils/test-sounds';

export default class Sync extends Route {
  model() {
    return {
      testSounds: testSounds.slice(0, 1),
      testSoundObjects: testSounds.map(sound => {
        return {
          url: `${sound.url}`
        }
      }).slice(0, 1),
      testSoundPromises: testSounds.map(sound => {
        return new Promise((resolve) => {
          console.log(`resolving promise: ${sound.url}`)
          resolve(`${sound.url}`)
        })
      }).slice(0, 1)
    }
  }
}
