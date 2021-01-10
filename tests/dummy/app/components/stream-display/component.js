import { makeArray } from '@ember/array';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  hifi: service(),
  classNames: ['stream-display'],

  didReceiveAttrs() {
    // ember hifi can't handle doing this consistently right now.

    // this.preload();
  },

  preload() {
    let urls = this.get('stream.mountPoints');
    let logger = this.get('logger');
    let load = this.get('hifi').load(urls, {debugName: this.get('stream.title')});
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
      let stream = this.get('stream');
      stream.set('currentMount', url);
      this.get('play')(stream);
    },
    tryAll() {
      this.get('tryAll')(this.get('stream'));
    }
  }
});
