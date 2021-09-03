import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { setupStereoTest } from 'ember-stereo/test-support/stereo-setup'
import { render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";

module("Integration | Helper | sound-metadata", function (hooks) {
  setupRenderingTest(hooks);
  setupStereoTest(hooks);
  test("it renders when key is specified", async function (assert) {
    let service = this.owner.lookup("service:stereo");

    this.url = "/good/1000/metadata.mp3";
    await service.load(this.url, { metadata: { artist: "beatles" } });
    await render(hbs`{{sound-metadata this.url key='artist'}}`);

    assert.equal(this.element.textContent.trim(), "beatles");
  });

  test("it renders when no key is specified", async function (assert) {
    let service = this.owner.lookup("service:stereo");

    this.url = "/good/1000/metadata.mp3";
    await service.load(this.url, { metadata: "whatever you want" });
    await render(hbs`{{sound-metadata this.url}}`);

    assert.equal(this.element.textContent.trim(), "whatever you want");
  });

  test("it renders metadata about current system sound", async function (assert) {
    let service = this.owner.lookup("service:stereo");

    this.url = "/good/1000/metadata.mp3";
    await render(hbs`{{sound-metadata (current-sound) key='title'}}`);
    await service.play(this.url, { metadata: { title: "whatever you want" } });

    assert.equal(this.element.textContent.trim(), "whatever you want");
  });

});
