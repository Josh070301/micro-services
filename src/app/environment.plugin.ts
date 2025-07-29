import { NgModule, InjectionToken, Provider, APP_INITIALIZER } from '@angular/core';
import { environment } from '../environments/environment';

export interface EnvConfig {
  API_SERVICE_URL: string;
}

export const ENV_CONFIG = new InjectionToken<EnvConfig>('Environment Configuration');

// Use typed environment config
const envConfig: EnvConfig = {
  API_SERVICE_URL: environment.apiUrl
};

export function initEnvironmentFactory() {
  return () => {
    console.log('Environment initialized with:', envConfig);
    return Promise.resolve(envConfig);
  };
}

export const ENV_PROVIDERS: Provider[] = [
  { 
    provide: ENV_CONFIG, 
    useFactory: () => {
      console.log('Environment variables in plugin:', import.meta.env);
      return {
        API_SERVICE_URL: environment.apiUrl
      };
    }
  },
  {
    provide: APP_INITIALIZER,
    useFactory: initEnvironmentFactory,
    deps: [ENV_CONFIG],
    multi: true
  }
];

@NgModule({})
export class EnvironmentModule {}