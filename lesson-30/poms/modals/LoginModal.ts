import { BaseModal } from './BaseModal';


export type TValues<T> = T[keyof T];

export const LoginModalErrorMessagesObj = {
  erroFirst: 'someText'
};

export type TLoginModalErrorMessagesObj = TValues<typeof LoginModalErrorMessagesObj>;

export enum LoginModalErrorMessages {
  erroFirst = 'someText'
}

export class LoginModal extends BaseModal {
  //@ts-ignore
  selectors = {
    // @ts-ignore
    ...this.selectors,
    emailInput: this.page.locator('[id="signinEmail"]'),
    passwordInput: this.page.locator('[id="signinPassword"]'),
    inputError: (errorText: TLoginModalErrorMessagesObj) => this.page.locator('inpput', { hasText: errorText })
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