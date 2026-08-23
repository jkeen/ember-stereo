import debug from 'debug';

const log = debug('ember-stereo:cast');

const SENDER_SRC =
  'https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1';

const FRAMEWORK_POLL_MS = 200;
const FRAMEWORK_POLL_LIMIT = 100;

let loadPromise = null;

export function isCastFrameworkPresent() {
  return (
    typeof window !== 'undefined' &&
    !!(
      window.cast &&
      window.cast.framework &&
      window.chrome &&
      window.chrome.cast
    )
  );
}

// Cast is absent on Safari, Firefox, and insecure contexts.
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

    // The SDK calls this once cast_sender.js parses, and true means Cast is available.
    window.__onGCastApiAvailable = (isAvailable) => {
      if (!isAvailable) {
        resolve(null);
        return;
      }
      resolve(whenFrameworkReady());
    };

    let script = document.createElement('script');
    script.src = SENDER_SRC;
    script.async = true;
    script.onerror = () => resolve(null);
    document.head.appendChild(script);

    // The callback can be overwritten or fire before `cast.framework` lands, so poll as a fallback.
    whenFrameworkReady().then((context) => {
      if (context) {
        resolve(context);
      }
    });
  });

  return loadPromise;
}

async function whenFrameworkReady() {
  for (let attempt = 0; attempt < FRAMEWORK_POLL_LIMIT; attempt++) {
    if (isCastFrameworkPresent()) {
      return initContext();
    }
    await new Promise((r) => setTimeout(r, FRAMEWORK_POLL_MS));
  }
  log('cast framework never became ready');
  return null;
}

function initContext() {
  try {
    let { cast, chrome } = window;
    let context = cast.framework.CastContext.getInstance();
    context.setOptions({
      receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
      autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
    });
    return context;
  } catch (e) {
    log(`cast sdk init failed: ${e}`);
    return null;
  }
}
