import Resolver from '../../resolver';
import config from '../../config/environment';

const resolver = Resolver.create({
  pluralizedTypes: {
    'stereo-connection': 'stereo-connections',
  },
});

resolver.namespace = {
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
};

export default resolver;
