import { getOwner } from '@ember/application';
import Mixin from '@ember/object/mixin';
import EmberObject, {
  getWithDefault,
  computed
} from '@ember/object';
import Debug from '../utils/debug';

// Keep this object around to keep track of logs.
const DebugLogging = EmberObject.create({
  loggers: {},

  findOrCreateLogger(name) {
    let loggerMap = this.get('loggers');
    let logger    = loggerMap[name];

    if (!logger) {
      logger = new Debug(name);
      loggerMap[name] = logger;
    }

    return logger;
  },

  log(name, message) {
    this.findOrCreateLogger(name).log(message);
  },

  timeStart(name, timerName) {
    this.findOrCreateLogger(name).time(timerName);
  },

  timeEnd(name, timerName) {
    this.findOrCreateLogger(name).timeEnd(timerName);
  }
});

export default Mixin.create({
  debugName: 'ember-hifi',

  debug() {
    let debugName, message;
    if (arguments.length === 1) {
      debugName = this.get('debugName');
      message   = arguments[0];
    }
    else if (arguments.length === 2) {
      debugName = arguments[0];
      message   = arguments[1];
    }

    this.hifiDebug.log(debugName, message);
  },

  timeStart() {
    this.hifiDebug.timeStart(...arguments);
  },

  timeEnd() {
    this.hifiDebug.timeEnd(...arguments);
  }
});
