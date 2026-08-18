const SENDER_SRC =
  'https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1';

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
      autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
    });
    return context;
  } catch (e) {
    return null;
  }
}
