import { test, expect } from '@playwright/test';

test('detalle de producto con precio existente', async ({ page }) => {
    await page.goto('https://demoblaze.com/prod.html?idp_=1');
   
    // Verificar que el precio es visible
    const productPrice = page.locator('.price-container');
    await expect(productPrice).toBeVisible();
})