import Service, { inject as service } from '@ember/service';
export default class Audio extends Service {
  @service stereo;

  async playGood() {
    return this.stereo.play('/good/1252/ok.mp3');
  }

  async playBad() {
    return this.stereo.play('/bad/1252/ok.mp3');
  }

  async playBlank() {
    return await this.stereo.play();
  }
}
