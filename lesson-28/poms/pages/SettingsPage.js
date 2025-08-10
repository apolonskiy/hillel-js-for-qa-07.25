import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import exp from 'constants';

export class SettingsPage extends BasePage {
  constructor(page, context){
    super(page, '/panel/settings', context);
  }

  selectors = {
    header: this._page.locator('h1', { hasText: 'Settings' }),
    settingsButton: (buttonText) => this._page.locator('button[class*="settings-control"]', { hasText: buttonText }),
    changeEmailButton: this._page.locator('button', { hasText: 'Change email' }),
    changePasswordButton: this._page.locator('button', { hasText: 'Change password' }),
    inputValidationError: (errorText) => this._page.locator(`//*[@class="invalid-feedback"]/p[text()='${errorText}']`)
  };

  async isPageVisible(){
    await expect(this.selectors.header).toBeVisible();
  }

  /**
   * @param {'EUR' | 'GBP' | 'USD' | 'UAH'| 'PLN'} currency 
   *
   */
  async selectCurrency(currency){
    await this.selectors.settingsButton(currency).click();
  }


  /**
   * @param {'EUR' | 'GBP' | 'USD' | 'UAH'| 'PLN'} currency 
   *
   */
  async isCurrencySelected(currency){
    await expect(this.selectors.settingsButton(currency)).toHaveClass(/btn-primary/gi);
  }

  /**
   * @param {'km' | 'ml'} units 
   *
   */
  async selectUnits(units){
    await this.selectors.settingsButton(units).click();
  }

  /**
   * @param {'km' | 'ml'} units 
   *
   */
  async isUnitsSelected(units){
    await expect(this.selectors.settingsButton(units)).toHaveClass(/btn-primary/gi);
  }

  async isInputValidationErrorVisible(errorText){
    await expect(this.selectors.inputValidationError(errorText)).toBeVisible();
  }

  async clickChangeEmail(){
    await this.selectors.changeEmailButton.click();
  }

  async clickChangePassword(){
    await this.selectors.changePasswordButton.click();
  }
}