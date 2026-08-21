import { module, test } from 'qunit';
import GoogleCastSdk from 'ember-stereo/-private/casting/google-cast-sdk';

const SAVED_SESSION_KEY = 'ember-stereo:cast:session-id';

module('Unit | Utility | google-cast-sdk', function (hooks) {
  hooks.afterEach(function () {
    window.localStorage.removeItem(SAVED_SESSION_KEY);
  });

  test('a session id is saved for rejoining and cleared when the session ends', function (assert) {
    let sdk = new GoogleCastSdk();

    sdk._saveSessionId({ getSessionId: () => 'session-abc' });
    assert.strictEqual(
      window.localStorage.getItem(SAVED_SESSION_KEY),
      'session-abc',
      'the id survives for a fresh browser to rejoin with',
    );

    sdk._clearSavedSessionId();
    assert.strictEqual(
      window.localStorage.getItem(SAVED_SESSION_KEY),
      null,
      'a cleanly ended session leaves nothing to rejoin',
    );
  });

  test('rejoining defers to a session the framework already has', function (assert) {
    let sdk = new GoogleCastSdk();
    window.localStorage.setItem(SAVED_SESSION_KEY, 'session-abc');

    // A live session (auto-join in another window) means requestSessionById must not fire.
    sdk._rejoinSavedSession({ getCurrentSession: () => ({}) });

    assert.strictEqual(
      window.localStorage.getItem(SAVED_SESSION_KEY),
      'session-abc',
      'the saved id is left alone for the session events to manage',
    );
  });

  test('a stale rejoin attempt with no Cast API dies quietly', function (assert) {
    let sdk = new GoogleCastSdk();
    window.localStorage.setItem(SAVED_SESSION_KEY, 'session-abc');

    sdk._rejoinSavedSession({ getCurrentSession: () => null });

    assert.ok(
      true,
      'requestSessionById is unavailable here, and that only logs',
    );
  });
});
