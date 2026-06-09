import { test, expect } from '@playwright/test';

test('detalle de producto existente', async ({ page }) => {
    await page.goto('https://demoblaze.com/prod.html?idp_=1');
    
    // Verificar que la descripción del producto existe y tiene contenido
    const productDescription = page.locator('#more-information');
    await expect(productDescription).toBeVisible();
    await expect(productDescription).toHaveText(/./);
    
})