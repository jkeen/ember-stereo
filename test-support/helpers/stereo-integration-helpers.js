import Service from 'ember-stereo/services/stereo';
import DummyConnection from 'ember-stereo/stereo-connections/dummy-connection';
import stereoNeeds from './stereo-needs';

const dummyStereo = Service.extend({
  init: function() {
    this.set('options', {
      emberStereo: {
        connections: [{
          name: 'DummyConnection',
          config: {
            testOption: 'DummyConnection'
          }
        }]
      }
    });
    this._super(...arguments);
  },
  _lookupConnection: function() {
    return DummyConnection;
  }
});


export {
  DummyConnection,
  dummyStereo,
  stereoNeeds
};
