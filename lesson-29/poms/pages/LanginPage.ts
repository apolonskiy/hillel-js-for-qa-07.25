import { LoginModal } from '../modals';
import { BasePage } from './BasePage';
import { BrowserContext, Page } from "@playwright/test";


export class LandingPage extends BasePage {
  constructor(page: Page, context: BrowserContext){
    super(page, '/', context);
  }

  selectors = {
    signInButton: this.page.locator('button', { hasText: 'Sign In' }),
  };

  async clickSignIn() {
    this.selectors.signInButton.click();
    return new LoginModal(this.page, this.context);
  }

}