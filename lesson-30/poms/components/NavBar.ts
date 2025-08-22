import { BaseComponent } from './BaseComponent';

export class NavBar extends BaseComponent {
  selectors = {
    logoutButton: this.page.locator('a', { hasText: 'Log out' }),
    tab: (tabName: 'garade' | 'expenses' | 'instructions' | 'profile'| 'settings') => this.page.locator(`a[routerlink="${tabName}"]`)
  };
    
  async selectTab(tabName: 'garade' | 'expenses' | 'instructions' | 'profile'| 'settings') {
    await this.selectors.tab(tabName).click();
  }

  async clickLogOut() {
    await this.selectors.logoutButton.click();
  }
}