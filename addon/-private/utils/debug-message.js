import debug from "debug";

export default function debugMessage(helper, message) {

  message = `[${helper.identifier}] ${message}`
  if (helper.sound) {
    message = `[✓]${message}`;
  }

  debug(`ember-stereo:helpers:${helper.name}`)(message)

  return false
}
