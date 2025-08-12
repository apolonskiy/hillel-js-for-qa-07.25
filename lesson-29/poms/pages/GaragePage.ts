import { BasePage } from './BasePage';
import { BrowserContext, Page, expect, Locator } from '@playwright/test';

export class GaragePage extends BasePage {
  constructor(page: Page, context: BrowserContext) {
    super(page, '/panel/garage', context);
  }

  private carNameLocator(brand: string, model: string): Locator {
    return this.page.locator('.car_name', { hasText: `${brand} ${model}` });
  }

  selectors = {
    // Use exact matching to avoid substring conflicts ("Add" vs "Add car")
    addCarButton: this.page.getByRole('button', { name: 'Add car', exact: true }),
    brandSelect: this.page.locator('select#addCarBrand'),
    modelSelect: this.page.locator('select#addCarModel'),
    mileageInput: this.page.locator('#addCarMileage'),
    // Scope the Add button to the open modal dialog
    addButton: this.page.locator('.modal-dialog').getByRole('button', { name: 'Add', exact: true }),
    carCardByBrandModel: (brand: string, model: string) => this.carNameLocator(brand, model),
    deleteButtonFor: (brand: string, model: string) => this.carNameLocator(brand, model).locator('..').locator('button', { hasText: 'Remove' }),
    // Updated selector for edit button
    editButtonFor: (brand: string, model: string) => this.carNameLocator(brand, model).locator('..').locator('[class="car_actions"] span'),
    removeCarButtonInEditModal: this.page.locator('.modal-dialog').getByRole('button', { name: 'Remove car', exact: true }),
    confirmDeleteButton: this.page.locator('.modal-dialog .btn.btn-danger', { hasText: /^Remove$/ }),
  };

  async clickAddCar() {
    await this.selectors.addCarButton.click();
  }

  async addCar(brand: string, model: string, mileage: number) {
    await this.clickAddCar();
    await this.selectors.brandSelect.waitFor({ state: 'visible' });
    await this.selectors.brandSelect.selectOption({ label: brand });
    await this.selectors.modelSelect.selectOption({ label: model });
    await this.selectors.mileageInput.fill(String(mileage));
    await this.selectors.addButton.click();
    await expect(this.selectors.carCardByBrandModel(brand, model)).toBeVisible();
  }

  async deleteCar(brand: string, model: string) {
    const carCard = this.selectors.carCardByBrandModel(brand, model);
    if (!(await carCard.isVisible())) return;

    // Try new edit flow first
    if (await this.selectors.editButtonFor(brand, model).isVisible()) {
      await this.selectors.editButtonFor(brand, model).click();
      if (await this.selectors.removeCarButtonInEditModal.isVisible()) {
        await this.selectors.removeCarButtonInEditModal.click();
      }
    } else if (await this.selectors.deleteButtonFor(brand, model).isVisible()) {
      // fallback old remove button on card
      await this.selectors.deleteButtonFor(brand, model).click();
    }

    if (await this.selectors.confirmDeleteButton.isVisible()) {
      await this.selectors.confirmDeleteButton.click();
    }

    await expect(carCard).toHaveCount(0);
  }
}
