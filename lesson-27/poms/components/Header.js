import { expect } from '@playwright/test';
import { BaseComponent } from './BaseComponent';

export class Header extends BaseComponent {


  selecotrs = {
    logo: this._page.locator('[class="header_logo"]'),
    tab: (tabName) => this._page.locator(`header nav[class*="header_nav"] a[routerlink="/panel/${tabName}"]`)
  };
    
  async isHeaderVisible(){
    await expect(this.selecotrs.logo).toBeVisible();
  }

  // garade, expenses, instructions
  async selectTab(tabName) {
    await this.selecotrs.tab(tabName).click();
  }
}