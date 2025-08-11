import { ApiClient } from './api-client';

export class SettingsAPI extends ApiClient {
  async putSettings(settings, headers) {
    return this.put('/api/users/settings', {
      data: settings,
      headers
    });
  }
}