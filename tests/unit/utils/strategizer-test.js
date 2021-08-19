import { module, test } from 'qunit';


module('Unit | Utility | strategizer', function () {
  test('should have correct order for attempts', async function (assert) {
    const service = this.owner.lookup('service:stereo').loadConnections(['LocalDummyConnection', 'NativeAudio']);

    let strategizer = new Strategizer(['/good/10000/sound.mp3', '/good/10000/sound.mp3'], {
      connections: service.connections
    })

    assert.true(strategizer.useStandardStrategy)
  });
});




