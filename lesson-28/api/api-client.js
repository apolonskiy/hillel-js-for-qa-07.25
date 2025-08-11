export class ApiClient {
  constructor(apiRequest) {
    this._apiRequest = apiRequest;
  };

  async get(url, options = {}) {
    return this._apiRequest.get(url, options);
  }

  async post(url, options = {}) {
    return this._apiRequest.post(url, options);
  }

  async put(url, options = {}) {
    return this._apiRequest.put(url, options);
  }

  async delete(url, options = {}) {
    return this._apiRequest.delete(url, options);
  }

  async patch(url, options = {}) {
    return this._apiRequest.patch(url, options);
  }
}