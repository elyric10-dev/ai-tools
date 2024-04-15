import { EnvService } from './env.service';

export const EnvServiceFactory = () => {
  const env = new EnvService();
  let browserWindow: { [key: string]: any } = {};
  let browserWindowEnv: { [key: string]: any } = {};

  if (typeof window !== 'undefined') {
    browserWindow = window || {};
    browserWindowEnv = browserWindow['__env'] || {};
  }

  for (const key in browserWindowEnv) {
    if (browserWindowEnv.hasOwnProperty(key)) {
      env[key] = browserWindowEnv[key];
    }
  }

  return env;
};

export const EnvServiceProvider = {
  provide: EnvService,
  useFactory: EnvServiceFactory,
  deps: [],
};
