export class BaseComponent {
  /**
    * @param {import('@playwright/test').Page} page
    * @param {import('@playwright/test').BrowserContext} context
    */
  constructor(page, context){
    this._page = page;
    this._context = context;
  }
}