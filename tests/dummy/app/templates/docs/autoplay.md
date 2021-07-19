# Autoplay restrictions

Back in the day it used to be easy to play audio without pesky autoplay blockers getting in the way. For those of us with good intentions who aren't trying to do user-hostile things like play annoying advertisements on page load, this can be frustrating.

Basically for everyone unfamiliar with browser autoplay blockers… in order for audio autoplay to be allowed:

  - The audio is muted or its volume is set to 0
  - The user has interacted with the site (by clicking, tapping, pressing keys, etc.)
  - If the site has been whitelisted; this may happen either automatically if the browser determines that the user engages with media frequently, or manually through preferences or other user interface features
  - If the autoplay feature policy is used to grant autoplay support to an \<iframe\> and its document.


{{docs/autoplay-checking}}
