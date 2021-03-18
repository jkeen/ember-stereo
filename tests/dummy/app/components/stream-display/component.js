import { makeArray } from '@ember/array';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  hifi: service(),
  classNames: ['stream-display'],

  didReceiveAttrs() {
this._super();
    // ember hifi can't handle doing this consistently right now.

    // this.preload();
  },

  preload() {
    let urls = this.get('stream.mountPoints');
    let logger = this.logger;
    let load = this.hifi.load(urls, {debugName: this.get('stream.title')});
    let title = this.get('stream.title');

    this.set('loading', true);

    load.then(results => {
      let badMounts = [];
      makeArray(results.failures).forEach(f => badMounts.push(f.url));
      this.set('stream.badMounts', badMounts.uniq());
      this.set('sound', results.sound);
    });

    load.catch(results => {
      let badMounts = [];
      makeArray(results.failures).forEach(f => badMounts.push(f.url));
      this.set('stream.badMounts', badMounts.uniq());
    });

    load.finally(() => {
      this.set('loading', false);
    });
  },

  actions: {
    listen(url) {
      let stream = this.stream;
      stream.set('currentMount', url);
      this.play(stream);
    },
    tryAll() {
      this.tryAll(this.stream);
    }
  }
});
