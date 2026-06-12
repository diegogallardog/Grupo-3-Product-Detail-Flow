// Importa las funciones test y expect del framework Playwright
// test → define un caso de prueba
// expect → realiza las validaciones/aserciones
const { test, expect } = require('@playwright/test');

// Importa la URL base de la UI desde helpers.js
// WEB = 'https://www.demoblaze.com'
const { WEB } = require('../helpers');

// Test 1: Verificar que se puede abrir el detalle de un producto desde la UI
test('UI - Abrir detalle de producto especifico', async ({ page }) => {
  // Navegamos a la página principal de DemoBlaze
  await page.goto(WEB);

  // Esperamos que cargue el primer producto visible
  await page.locator('.card-title a').first().waitFor();

  // Hacemos click en el primer producto
  await page.locator('.card-title a').first().click();

  // Verificamos que la URL cambió a la página de detalle
  await expect(page).toHaveURL(/prod\.html/);

  // Verificamos que el título del producto es visible
  await expect(page.locator('.name')).toBeVisible();
});
