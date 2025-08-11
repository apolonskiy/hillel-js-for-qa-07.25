import { ApiClient } from './api-client';

export class AuthenticationAPI extends ApiClient {

  async login(email, password, remember = false) {
    return this.post('/api/auth/signin', {
      data: {
        email,
        password,
        remember
      }
    });
  }
}