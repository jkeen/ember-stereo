import Service from 'ember-stereo/services/stereo';
import DummyConnection from 'ember-stereo/stereo-connections/dummy-connection';
import stereoNeeds from './stereo-needs';

const dummyStereo = class DummyStereo extends Service {
  options = {
    emberStereo: {
      connections: [{
        name: 'DummyConnection',
        config: {
          testOption: 'DummyConnection'
        }
      }]
    }
  }

  _lookupConnection() {
    return DummyConnection;
  }
}

export {
  DummyConnection,
  dummyStereo,
  stereoNeeds
};
