import { BrowserContext, expect, Locator, Page } from '@playwright/test';

export class BaseModal {
  protected page: Page;
  protected context: BrowserContext;
  public readonly selectors: Record<string, Locator>;
  // protected selectors: {
  //   [key: string]: Locator;
  // }
  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.context = context;
    this.selectors = {
      modalContent: this.page.locator('[class="modal-content"]'),
      modalHeader: this.page.locator('[class="modal-header"]'),
      closeButton: this.page.locator('[class="modal-content"] [aria-label="Close"]'),
      submitButton: this.page.locator('[class="modal-content"] [class$="primary"]'),
    };
  }

  async isModalVisible(){
    await expect(this.selectors.modalContent).toBeVisible();
  }

  async clickCloseButton(){
    await this.selectors.closeButton.click();
  }

  async clickSubmitButton(){
    await this.selectors.submitButton.click();
  }


}