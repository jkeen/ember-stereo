import Service, { inject as service } from '@ember/service';
export default class Audio extends Service {
  @service hifi

  async playGood() {
    return this.hifi.play('/good/1252/ok.mp3');
  }

  async playBad() {
    return this.hifi.play('/bad/1252/ok.mp3');
  }

  async playBlank() {
    return await this.hifi.play();
  }
} 
