import { BrowserContext, expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import exp from 'constants';

export class SettingsPage extends BasePage {
  constructor(page: Page, context: BrowserContext){
    super(page, '/panel/settings', context);
  }

  selectors = {
    header: this.page.locator('h1', { hasText: 'Settings' }),
    settingsButton: (buttonText: 'EUR' | 'GBP' | 'USD' | 'UAH'| 'PLN' | 'km' | 'ml') => this.page.locator('button[class*="settings-control"]', { hasText: buttonText }),
    changeEmailButton: this.page.locator('button', { hasText: 'Change email' }),
    changePasswordButton: this.page.locator('button', { hasText: 'Change password' }),
    inputValidationError: (errorText) => this.page.locator(`//*[@class="invalid-feedback"]/p[text()='${errorText}']`)
  };

  async isPageVisible(){
    await expect(this.selectors.header).toBeVisible();
  }

  async selectCurrency(currency: 'EUR' | 'GBP' | 'USD' | 'UAH' | 'PLN') {
    await this.selectors.settingsButton(currency).click();
  }


  async isCurrencySelected(currency: 'EUR' | 'GBP' | 'USD' | 'UAH' | 'PLN') {
    await expect(this.selectors.settingsButton(currency)).toHaveClass(/btn-primary/gi);
  }


  async selectUnits(units: 'km' | 'ml'){
    await this.selectors.settingsButton(units).click();
  }

  async isUnitsSelected(units: 'km' | 'ml'){
    await expect(this.selectors.settingsButton(units)).toHaveClass(/btn-primary/gi);
  }

  async isInputValidationErrorVisible(errorText: string){
    await expect(this.selectors.inputValidationError(errorText)).toBeVisible();
  }

  async clickChangeEmail(){
    await this.selectors.changeEmailButton.click();
  }

  async clickChangePassword(){
    await this.selectors.changePasswordButton.click();
  }
}