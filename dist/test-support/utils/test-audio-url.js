import StereoUrl from '../../-private/utils/stereo-url.js';

class TestAudioUrl {
  constructor(testUrl) {
    this.url = new StereoUrl(testUrl);
    if (this.url.pathname && this.url.pathname.startsWith('/') && this.url.pathname.length > 1) {
      var [, result, lengthOrError, name] = this.url.pathname.replace(/^\/?tests\//, '').split('/');
      this.status = result;
      this.lengthOrError = lengthOrError;
      this.name = name;
    }
  }
  get isTestUrl() {
    return (this.status === 'good' || this.status === 'bad') && this.lengthOrError && this.name;
  }
  get isSuccess() {
    return this.status === 'good';
  }
  get isError() {
    return this.status === 'bad';
  }
  get isValid() {
    return this.isSuccess() || this.isError();
  }
  get isStream() {
    return this.isSuccess && this.lengthOrError === 'stream';
  }
  get duration() {
    if (this.isSuccess) {
      if (this.isStream) {
        return Infinity;
      } else {
        return parseInt(this.lengthOrError, 10) / 1000;
      }
    }
    return NaN;
  }
  get error() {
    if (this.isError) {
      return this.lengthOrError;
    }
    return NaN;
  }
}

export { TestAudioUrl as default };
//# sourceMappingURL=test-audio-url.js.map
