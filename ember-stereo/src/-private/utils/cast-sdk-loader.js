// Lazy loader + initializer for the Google Cast sender SDK (Chromecast).
//
// All SDK-presence guarding lives here so the service stays clean and the whole
// thing no-ops gracefully where Cast isn't available (Safari, Firefox, insecure
// contexts). loadCastSdk() resolves to the initialized cast.framework.CastContext
// when Cast is usable, or null when it isn't. Idempotent — the script is injected
// at most once.

const SENDER_SRC =
  'https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1';

let loadPromise = null;

export function isCastFrameworkPresent() {
  return (
    typeof window !== 'undefined' &&
    !!(window.cast && window.cast.framework && window.chrome && window.chrome.cast)
  );
}

export function loadCastSdk() {
  if (loadPromise) {
    return loadPromise;
  }

  loadPromise = new Promise((resolve) => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      resolve(null);
      return;
    }

    if (isCastFrameworkPresent()) {
      resolve(initContext());
      return;
    }

    // The SDK calls this once cast_sender.js parses; true => Cast is available.
    window.__onGCastApiAvailable = (isAvailable) => {
      resolve(isAvailable ? initContext() : null);
    };

    let script = document.createElement('script');
    script.src = SENDER_SRC;
    script.async = true;
    script.onerror = () => resolve(null);
    document.head.appendChild(script);
  });

  return loadPromise;
}

function initContext() {
  try {
    let { cast, chrome } = window;
    let context = cast.framework.CastContext.getInstance();
    context.setOptions({
      receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
      // Re-attach to an existing session from this origin on reload.
      autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
    });
    return context;
  } catch (e) {
    return null;
  }
}
