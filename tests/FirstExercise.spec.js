// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('First Exercise', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('http://demo6691984.mockable.io/min-max', async route => {
      const json = { min: 10, max: 50 };
      await route.fulfill({ json });
    });

    await page.route('http://demo6691984.mockable.io/fixed', async route => {
      const json = [1.99, 5.99, 10.99, 30.99, 50.99, 70.99];
      await route.fulfill({ json });
    });
  });

  test('should show page header', async ({ page }) => {
    await page.goto('http://localhost:8080/');
  
    await expect(page.getByText('First Exercise')).toBeVisible();
  });

  test('should change min price moving the min slider', async ({ page }) => {
    await page.goto('http://localhost:8080/');
    
    const slider = await page.getByTestId('slider').first();
    const destinationElement = await page.getByTestId('30').boundingBox();

    if (!destinationElement) {
      throw new Error('Unable to find bounding box on element');
    }

    const offset = 5;

    const elementCenterX = destinationElement.x + destinationElement.width / 2;
    const elementCenterY = destinationElement.y + destinationElement.height / 2;

    await slider.hover();
    await page.mouse.down();
    await page.mouse.move(elementCenterX + offset, elementCenterY + offset);
    await page.mouse.move(elementCenterX + offset, elementCenterY + offset);
    await page.mouse.up();

    await expect(page.getByText('$30')).toBeVisible();
    await expect(page.getByText('$50')).toBeVisible();
  });

  test('should change max price moving the max slider', async ({ page }) => {
    await page.goto('http://localhost:8080/');
    
    const slider = await page.getByTestId('slider').last();
    const destinationElement = await page.getByTestId('40').boundingBox();

    if (!destinationElement) {
      throw new Error('Unable to find bounding box on element');
    }

    const offset = 5;

    const elementCenterX = destinationElement.x + destinationElement.width / 2;
    const elementCenterY = destinationElement.y + destinationElement.height / 2;

    await slider.hover();
    await page.mouse.down();
    await page.mouse.move(elementCenterX + offset, elementCenterY + offset);
    await page.mouse.move(elementCenterX + offset, elementCenterY + offset);
    await page.mouse.up();

    await expect(page.getByText('$10')).toBeVisible();
    await expect(page.getByText('$40')).toBeVisible();
  });

  test('should allow min price manual editing', async ({ page }) => {
    await page.goto('http://localhost:8080/');

    await page.getByText('$10').click();

    await page.getByRole('textbox').fill('20');

    await page.getByRole('textbox').press('Enter');

    await expect(page.getByText('$20')).toBeVisible();
  });

  test('should allow max price manual editing', async ({ page }) => {
    await page.goto('http://localhost:8080/');

    await page.getByText('$50').click();

    await page.getByRole('textbox').fill('30');

    await page.getByRole('textbox').press('Enter');

    await expect(page.getByText('$30')).toBeVisible();
  });
});
