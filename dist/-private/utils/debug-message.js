import debug from 'debug';

function debugMessage(helper, message) {
  message = `[${helper.identifier}] ${message}`;
  if (helper.sound) {
    message = `[✓]${message}`;
  }
  debug(`ember-stereo-helpers:${helper.name}`)(message);
  return false;
}

export { debugMessage as default };
//# sourceMappingURL=debug-message.js.map
