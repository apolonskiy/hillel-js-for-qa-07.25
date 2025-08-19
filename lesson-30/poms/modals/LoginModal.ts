import { BaseModal } from './BaseModal';

export class LoginModal extends BaseModal {
  //@ts-ignore
  selectors = {
    // @ts-ignore
    ...this.selectors,
    emailInput: this.page.locator('[id="signinEmail"]'),
    passwordInput: this.page.locator('[id="signinPassword"]'),
  };

  async typeEmail(email: string){
    await this.selectors.emailInput.fill(email);
  }

  async typePassword(password: string){
    await this.selectors.passwordInput.fill(password);
  }

  async executeLogin(email: string, password: string){
    await this.typeEmail(email);
    await this.typePassword(password);
    await this.clickSubmitButton();
  }
}