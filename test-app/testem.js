const circle = process.env.CIRCLE_TEST_RESULTS;

('use strict');

module.exports = {
  test_page: 'tests/index.html?hidepassed',
  disable_watching: true,
  reporter: circle ? 'xunit' : 'tap',
  report_file: circle ? `${circle}/test.xml` : null,
  xunit_intermediate_output: true,
  launch_in_ci: [
    'Chrome',
    // 'Firefox', sad to say but Firefox headless struggles with some of these tests
  ],
  launch_in_dev: [],
  browser_start_timeout: 120,
  browser_args: {
    Chrome: {
      ci: [
        // --no-sandbox is needed when running Chrome inside a container
        process.env.CI ? '--no-sandbox' : null,
        '--headless',
        '--disable-dev-shm-usage',
        '--disable-software-rasterizer',
        '--ignore-autoplay-restriction',
        '--autoplay-policy=no-user-gesture-required',
        '--no-user-gesture-required',
        '--mute-audio',
        '--remote-debugging-port=0',
        '--window-size=1440,900',
      ].filter(Boolean),
    },
    Firefox: {
      mode: 'ci',
      args: [
        '-headless', // not sure if the flags below even work, but can't find the docs
        '--ignore-autoplay-restriction',
        '--autoplay-policy=no-user-gesture-required',
        '--no-user-gesture-required',
        '--mute-audio',
      ],
    },
  },
};
