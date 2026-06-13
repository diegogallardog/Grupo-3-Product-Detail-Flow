/**
 * ========================================================
 * TEST CASE 04 NEGATIVO - Validación de Precio
 * ========================================================
 * Tests negativos para validar que fallan cuando el
 * precio del producto NO cumple con los criterios.
 * ========================================================
 */

const { test, expect } = require('@playwright/test');
const { API } = require('../helpers');

/* Validar que falla cuando se intenta acceder con ID inválido */
test('TC04-NEG.1 - Fallar con ID de producto inválido', async ({ request }) => {
  // Usar un ID que no existe
  const idInvalido = 99999;

  // Hacer llamada POST a /view con ID inválido
  const productResponse = await request.post(`${API}/view`, {
    data: { id: idInvalido },
  });

  // El servidor responde con éxito pero sin datos válidos
  const productData = await productResponse.json();

  // Verificar que el precio está vacío, es 0 o falso
  expect(productData.price).toBeFalsy();
});

/* Validar que el precio no es un string */
test('TC04-NEG.2 - Verificar que el precio NO es un string', async ({
  request,
}) => {
  // Obtener el listado de productos
  const entriesResponse = await request.get(`${API}/entries`);
  const entriesData = await entriesResponse.json();
  const primerProductoId = entriesData.Items[0].id;

  // Obtener detalles del producto
  const productResponse = await request.post(`${API}/view`, {
    data: { id: primerProductoId },
  });

  const productData = await productResponse.json();

  // Verificar que el precio NO es un string
  expect(typeof productData.price).not.toBe('string');
});

/* Validar que el precio NO es null */
test('TC04-NEG.3 - Verificar que el precio NO es null', async ({ request }) => {
  // Obtener el listado de productos
  const entriesResponse = await request.get(`${API}/entries`);
  const entriesData = await entriesResponse.json();
  const primerProductoId = entriesData.Items[0].id;

  // Obtener detalles del producto
  const productResponse = await request.post(`${API}/view`, {
    data: { id: primerProductoId },
  });

  const productData = await productResponse.json();

  // Verificar que el precio NO es null
  expect(productData.price).not.toBeNull();
});

/* Validar que el precio NO es menor o igual a 0 */
test('TC04-NEG.4 - Verificar que el precio NO es menor o igual a 0', async ({
  request,
}) => {
  // Obtener el listado de productos
  const entriesResponse = await request.get(`${API}/entries`);
  const entriesData = await entriesResponse.json();
  const primerProductoId = entriesData.Items[0].id;

  // Obtener detalles del producto
  const productResponse = await request.post(`${API}/view`, {
    data: { id: primerProductoId },
  });

  const productData = await productResponse.json();

  // Verificar que el precio NO es menor o igual a 0 (debe ser mayor a 0)
  expect(productData.price).not.toBeLessThanOrEqual(0);
});

/* Validar que el precio no es un array */
test('TC04-NEG.5 - Verificar que el precio NO es un array', async ({
  request,
}) => {
  // Obtener el listado de productos
  const entriesResponse = await request.get(`${API}/entries`);
  const entriesData = await entriesResponse.json();
  const primerProductoId = entriesData.Items[0].id;

  // Obtener detalles del producto
  const productResponse = await request.post(`${API}/view`, {
    data: { id: primerProductoId },
  });

  const productData = await productResponse.json();

  // Verificar que el precio NO es un array
  expect(Array.isArray(productData.price)).toBe(false);
});

/* Validar fallo cuando no se envía el ID requerido */
test('TC04-NEG.6 - Fallar cuando no se envía el ID', async ({ request }) => {
  // Hacer llamada POST a /view sin ID
  const productResponse = await request.post(`${API}/view`, {
    data: {},
  });

  const productData = await productResponse.json();

  // Sin ID, el precio debe estar vacío o falso
  expect(productData.price).toBeFalsy();
});

/* Validar que múltiples productos no tienen precio menor o igual a 0 */
test('TC04-NEG.7 - Validar que NINGÚN producto tiene precio menor o igual a 0', async ({
  request,
}) => {
  // Obtener el listado de productos
  const entriesResponse = await request.get(`${API}/entries`);
  const entriesData = await entriesResponse.json();

  // Validar los primeros 5 productos
  const productosAValidar = Math.min(5, entriesData.Items.length);

  for (let i = 0; i < productosAValidar; i++) {
    const productId = entriesData.Items[i].id;

    // Obtener detalles del producto
    const productResponse = await request.post(`${API}/view`, {
      data: { id: productId },
    });

    const productData = await productResponse.json();

    // Verificar que el precio NO es menor o igual a 0
    expect(productData.price).not.toBeLessThanOrEqual(0);
    expect(productData.price).toBeGreaterThan(0);

    console.log(
      `✓ Producto ${i + 1}: ${productData.title} NO tiene precio inválido - $${productData.price}`,
    );
  }
});
