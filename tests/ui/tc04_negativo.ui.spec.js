import { test, expect } from '@playwright/test';

test('detalle de producto sin precio - caso negativo', async ({ page }) => {
    // Intentar acceder a un producto con ID inválido
    await page.goto('https://demoblaze.com/prod.html?idp_=99999');
   
    // Verificar que el precio NO es visible
    const productPrice = page.locator('.price-container');
    await expect(productPrice).not.toBeVisible();
})
