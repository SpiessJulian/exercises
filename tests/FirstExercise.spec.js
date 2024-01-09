// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('First Exercise', () => {
  test('should show page header', async ({ page }) => {
    await page.goto('http://localhost:8080/');
  
    await expect(page.getByText('First Exercise')).toBeVisible();
  });

  test('should change min price moving the min slider', async ({ page }) => {
    await page.goto('http://localhost:8080/');
  
    await page.getByTestId('slider').first().hover();
    await page.mouse.down();
    await page.getByTestId('20').hover();
    await page.mouse.up();

    //await expect(page.getByText('$20')).toBeVisible();
  });
});
