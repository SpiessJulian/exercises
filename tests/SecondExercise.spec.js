// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Second Exercise', () => {
  test('should show page header', async ({ page }) => {
    await page.goto('http://localhost:8080/exercise2', { waitUntil: 'networkidle' });
  
    await expect(page.getByText('Second Exercise')).toBeVisible();

    await expect(page.getByText('$1.99')).toBeVisible();
    await expect(page.getByText('$70.99')).toBeVisible();
  });

  test('should change min price moving the min slider', async ({ page }) => {
    await page.goto('http://localhost:8080/exercise2', { waitUntil: 'networkidle' });
    
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

    await expect(page.getByText('$30.99')).toBeVisible();
    await expect(page.getByText('$70.99')).toBeVisible();
  });

  test('should change max price moving the max slider', async ({ page }) => {
    await page.goto('http://localhost:8080/exercise2', { waitUntil: 'networkidle' });
    
    const slider = await page.getByTestId('slider').last();
    const destinationElement = await page.getByTestId('50').boundingBox();

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

    await expect(page.getByText('$1.99')).toBeVisible();
    await expect(page.getByText('$50.99')).toBeVisible();
  });
});
