const circle = process.env.CIRCLE_TEST_RESULTS;

'use strict';

module.exports = {
  test_page: 'tests/index.html?hidepassed',
  disable_watching: true,
  reporter: circle ? 'xunit' : 'tap',
  report_file: circle ? `${circle}/test.xml` : null,
  xunit_intermediate_output: true,
  launch_in_ci: [
    'Chrome'
  ],
  launch_in_dev: [
  ],
  browser_start_timeout: 120,
  browser_args: {
    Chrome: [
      // --no-sandbox is needed when running Chrome inside a container
      process.env.CI ? '--no-sandbox' : null,
      '--disable-gpu',
      '--headless',
      '--mute-audio',
      '--remote-debugging-port=0',
      '--window-size=1440,900',
      '--ignore-autoplay-restriction',
      '--autoplay-policy=no-user-gesture-required',
      '--no-user-gesture-required',
      '--remote-debugging-port=9222',
      '--debug',
    ].filter(Boolean),
  }
};
