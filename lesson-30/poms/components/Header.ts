import { expect } from '@playwright/test';
import { BaseComponent } from './BaseComponent';

export class Header extends BaseComponent {
  selectors = {
    logo: this.page.locator('[class="header_logo"]'),
    tab: (tabName: 'garade' | 'expenses' | 'instructions' | 'profile'| 'settings') => this.page.locator(`header nav[class*="header_nav"] a[routerlink="/panel/${tabName}"]`)
  };
    
  async isHeaderVisible(){
    await expect(this.selectors.logo).toBeVisible();
  }

  // garade, expenses, instructions
  async selectTab(tabName: 'garade' | 'expenses' | 'instructions' | 'profile'| 'settings') {
    await this.selectors.tab(tabName).click();
  }
}