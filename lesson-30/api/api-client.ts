import { APIRequestContext } from "@playwright/test";

export class ApiClient {
  private apiRequest: APIRequestContext
  constructor(apiRequest: APIRequestContext) {
    this.apiRequest = apiRequest;
  };

  async get(url:string, options = {}) {
    return this.apiRequest.get(url, options);
  }

  async post(url:string, options = {}) {
    return this.apiRequest.post(url, options);
  }

  async put(url:string, options = {}) {
    return this.apiRequest.put(url, options);
  }

  async delete(url:string, options = {}) {
    return this.apiRequest.delete(url, options);
  }

  async patch(url:string, options = {}) {
    return this.apiRequest.patch(url, options);
  }
}