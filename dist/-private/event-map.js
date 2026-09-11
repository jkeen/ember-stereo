/*
 * The set of audio events that get relayed up the chain:
 * connection → Sound → stereo service. The `event` is the public event name;
 * the `handler` is the service method that re-triggers it at the service level.
 */
const EVENT_MAP = [{
  event: 'audio-played',
  handler: '_relayPlayedEvent'
}, {
  event: 'audio-paused',
  handler: '_relayPausedEvent'
}, {
  event: 'audio-blocked',
  handler: '_relayBlockedEvent'
}, {
  event: 'audio-ended',
  handler: '_relayEndedEvent'
}, {
  event: 'audio-duration-changed',
  handler: '_relayDurationChangedEvent'
}, {
  event: 'audio-position-changed',
  handler: '_relayPositionChangedEvent'
}, {
  event: 'audio-loaded',
  handler: '_relayLoadedEvent'
}, {
  event: 'audio-loading',
  handler: '_relayLoadingEvent'
}, {
  event: 'audio-position-will-change',
  handler: '_relayPositionWillChangeEvent'
}, {
  event: 'audio-will-rewind',
  handler: '_relayWillRewindEvent'
}, {
  event: 'audio-will-fast-forward',
  handler: '_relayWillFastForwardEvent'
}, {
  event: 'audio-metadata-changed',
  handler: '_relayMetadataChangedEvent'
}];
const SERVICE_EVENT_MAP = [{
  event: 'current-sound-changed'
}, {
  event: 'current-sound-interrupted'
}, {
  event: 'new-load-request'
}, {
  event: 'pre-load'
}, {
  event: 'audio-cast-availability-changed'
}, {
  event: 'audio-cast-connecting'
}, {
  event: 'audio-cast-connected'
}, {
  event: 'audio-cast-disconnected'
}];

export { EVENT_MAP, SERVICE_EVENT_MAP };
//# sourceMappingURL=event-map.js.map
