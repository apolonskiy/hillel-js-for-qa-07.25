import { LoginModal } from '../modals';
import { BasePage } from './BasePage';

export class LandingPage extends BasePage {
  constructor(page, context){
    super(page, '/', context);
  }

  selectors = {
    signInButton: this._page.locator('button', { hasText: 'Sign In' }),
  };

  async clickSignIn() {
    this.selectors.signInButton.click();
    return new LoginModal(this._page, this._context);
  }

}