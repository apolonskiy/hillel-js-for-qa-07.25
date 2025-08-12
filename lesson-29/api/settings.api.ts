import { ApiClient } from './api-client';

export class SettingsAPI extends ApiClient {
  async putSettings(settings: { currency?: 'usd' | 'eur' | 'gbp' | 'uah' | 'pln', distanceUnits?: 'km' | 'ml' }, headers?: Record<string, string>) {
    return this.put('/api/users/settings', {
      data: settings,
      headers
    });
  }
}