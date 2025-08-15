import { BrowserContext, Page } from "@playwright/test";

export class BasePage {
  protected page: Page;
  protected context: BrowserContext;
  private url: string;
  constructor(page: Page, url: string, context: BrowserContext) {
    this.page = page;
    this.url = url;
    this.context = context;
  }

  async open() {
    if(!this.url) throw new Error('No URL provided for page!');   
    await this.page.goto(this.url);
  }

}