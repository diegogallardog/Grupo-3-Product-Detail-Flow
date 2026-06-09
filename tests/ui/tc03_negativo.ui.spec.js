import { test, expect } from '@playwright/test';

test('detalle de producto no existente - caso negativo', async ({ page }) => {
    // Intentar acceder a un producto con ID inválido
    await page.goto('https://demoblaze.com/prod.html?idp_=99999');
    
    // Verificar que la descripción del producto NO existe o está vacía
    const productDescription = page.locator('#more-information');
    
    // Validar que el elemento no sea visible o que la página muestre un estado de error
    await expect(productDescription).not.toBeVisible();
})
