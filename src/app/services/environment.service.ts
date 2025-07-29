import { Injectable, inject } from '@angular/core';
import { ENV_CONFIG } from '../environment.plugin';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
    private envConfig = inject(ENV_CONFIG);
    
    get apiUrl(): string {
        return this.envConfig['API_SERVICE_URL'];
    }
}