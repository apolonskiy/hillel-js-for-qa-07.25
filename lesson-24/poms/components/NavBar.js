import { expect } from '@playwright/test';
import { BaseComponent } from './BaseComponent';

export class NavBar extends BaseComponent {
  selecotrs = {
    logoutButton: this._page.locator('a', { hasText: 'Log out' }),
    tab: (tabName) => this._page.locator(`a[routerlink="${tabName}"]`)
  };
    


  /**
   * @param {'garade' | 'expenses' | 'instructions' | 'profile'| 'settings'} tabName 
   *
   */
  async selectTab(tabName) {
    await this.selecotrs.tab(tabName).click();
  }

  async clickLogOut() {
    await this.selecotrs.logoutButton.click();
  }
}