import Service from '@ember/service';
import Debug from '../utils/debug';
import Mixin from '@ember/object/mixin';
import EmberObject, {
  getWithDefault,
  computed
} from '@ember/object';
import { getOwner } from '@ember/application';

export default Service.extend({
  init() {
    this.set('loggers', {});
    this._super(...arguments);
  },

  debugEnabled: computed(function() {
    let owner = getOwner(this);
    // We need this calculated field in the mixin because configuration gets looked up on the container.
    if (owner) { // if there's no owner, we're not quite initialized yet
      let config = owner.resolveRegistration('config:environment') || {};
      return getWithDefault(config, 'emberHifi.debug', false);
    }
  }),

  findOrCreateLogger(name = 'ember-hifi') {
    let loggerMap = this.get('loggers');
    let logger    = loggerMap[name];

    if (!logger) {
      logger = new Debug(name);
      loggerMap[name] = logger;
    }

    return logger;
  },

  log(/* name, message  or just message*/) {
    if (this.debugEnabled) {
      var name, message;
      if (arguments.length === 1) {
        name = this.get('debugName');
        message   = arguments[0];
      }
      else if (arguments.length === 2) {
        name = arguments[0];
        message   = arguments[1];
      }

      this.findOrCreateLogger(name).log(message);
    }
  },

  timeStart(name, timerName) {
    if (this.debugEnabled) {
      this.findOrCreateLogger(name).log(timerName);
    }
  },

  timeEnd(name, timerName) {
    if (this.debugEnabled) {
      this.findOrCreateLogger(name).log(timerName);
    }
  }
});
