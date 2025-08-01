// // @ts-check
import { test, expect } from '@playwright/test';

// const expect = expectBase.configure({soft: true});
test('Selectors basic existence checks', async({ page }) => {
  // simple locators
  await page.goto('https://devexpress.github.io/testcafe/example/');
  await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
  await expect(page.getByLabel('Windows')).toBeVisible();
  // await expect(page.getByPlaceholder('Enter Key')).toHaveCount(1);
  await expect(page.getByText('How would you rate TestCafe on a scale from 1 to 10')).toBeVisible();
  await expect(page.getByTestId('populate-button')).toBeVisible();
  await expect(page.locator('textarea[data-testid="comments-area"]')).toBeVisible();
  await expect(page.locator('//fieldset/legend', { hasText: 'Which TestCafe interface do you use:' })).toBeVisible();

  // loators with filtering
  await expect(page.locator('fieldset', { hasText: 'What is your primary Operating System:' }).locator('p')).toHaveCount(3);
  await expect(page.locator('fieldset', { hasText: 'What is your primary Operating System:' }).getByRole('paragraph')).toHaveCount(3);

  console.log(await page.locator('fieldset').filter({ has: page.locator('select') }).textContent());
  await expect(page.locator('fieldset').filter({ has: page.locator('select') })).toBeVisible();



  await page.goto('https://playwright.dev/docs/locators#locate-by-test-id');
  await expect(page.getByTitle('system mode')).toBeVisible();
  await page.getByTitle('system mode').click();
  await page.waitForTimeout(3000);
  await expect(page.getByAltText('playwright logo')).toHaveCount(2);
});
  


test('Interactions with selectors', async({ page }) => {
  // simple locators
  await page.goto('https://devexpress.github.io/testcafe/example/');
  const inputValueChanged = 'This is updated input';
  // fill
  await expect(page.getByTestId('name-input')).toHaveValue('');
  await page.getByTestId('name-input').fill(inputValueChanged);
  await expect(page.getByTestId('name-input')).toHaveValue(inputValueChanged);

  // check
  await expect(page.locator('label[for="macos"] input')).not.toBeChecked();
  await page.locator('label[for="macos"]').check();
  await expect(page.locator('label[for="macos"] input')).toBeChecked();

  //select
  await expect(page.getByTestId('preferred-interface-select')).toHaveValue('Command Line');
  await page.getByTestId('preferred-interface-select').selectOption('JavaScript API');
  await expect(page.getByTestId('preferred-interface-select')).toHaveValue('JavaScript API');

  //click or double click and dragnDrop
  await expect(page.locator('[id="slider"]')).toHaveClass(/ui-slider-disabled/gi);
  await page.locator('[for="tried-test-cafe"]').click();
  await expect(page.locator('[id="slider"]')).not.toHaveClass(/ui-slider-disabled/gi);

  await page.locator('[class="slider-container"] span').dragTo(page.locator('[class="slider-value"]', { hasText: 5 }));

  // native dialog handling
  // page.on('dialog', async(dialog) => {
  //   console.log(`Dialog message: ${dialog.message()}`);
  //   await dialog.dismiss(); // or dialog.dismiss()
  // });
  // await page.getByTestId('populate-button').click();
  // await expect(page.getByTestId('name-input')).toHaveValue(inputValueChanged);
  page.on('dialog', async(dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    await dialog.accept(); // or dialog.dismiss()
  });
  await page.getByTestId('populate-button').click();
  await expect(page.getByTestId('name-input'), 'Input has not changed on button click').toHaveValue('Peter Parker');

  //not auto-retrying assertions
  const inputValue = await page.getByTestId('name-input').inputValue();
  // eslint-disable-next-line playwright/prefer-web-first-assertions
  expect(inputValue).toBe('Peter Parker');

  // working with arrays of selectors
  const checkboxSelectors = page.locator('//fieldset[legend[contains(text(), "Which features")]]//input');
  const checkboxesCount = await checkboxSelectors.count();
  for(let i = 0; i < checkboxesCount; i++) {
    await expect(checkboxSelectors.nth(i)).not.toBeChecked();
    await checkboxSelectors.nth(i).click();
    await expect(checkboxSelectors.nth(i)).toBeChecked();
  }

  // check backwards
  for(const checkbox of await checkboxSelectors.all()) {
    await expect(checkbox).toBeChecked();
    await checkbox.click();
    await expect(checkbox).not.toBeChecked();
  }
});


test.skip('Screenshot testing', async({ page }) => {
  // simple locators
  await page.goto('https://devexpress.github.io/testcafe/example/');
  await expect(page.locator('[id="slider"]')).toHaveClass(/ui-slider-disabled/gi);
  await page.locator('[for="tried-test-cafe"]').click();
  await expect(page.locator('[id="slider"]')).not.toHaveClass(/ui-slider-disabled/gi);

  await page.locator('[class="slider-container"] span').dragTo(page.locator('[class="slider-value"]', { hasText: 5 }));

  const checkboxSelectors = page.locator('//fieldset[legend[contains(text(), "Which features")]]//input');
  const checkboxesCount = await checkboxSelectors.count();
  for(let i = 0; i < checkboxesCount; i++) {
    await expect(checkboxSelectors.nth(i)).not.toBeChecked();
    await checkboxSelectors.nth(i).click();
    await expect(checkboxSelectors.nth(i)).toBeChecked();
  }
  await expect(page).toHaveScreenshot('testcafe.default.png');
});