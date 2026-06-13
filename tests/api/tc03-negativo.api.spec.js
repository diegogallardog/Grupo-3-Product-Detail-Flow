/**
 * ========================================================
 * TEST CASE 03 NEGATIVO - Validación de Descripción
 * ========================================================
 * Tests negativos para validar que fallan cuando la
 * descripción del producto NO cumple con los criterios.
 * ========================================================
 */

const { test, expect } = require('@playwright/test');
const { API } = require('../helpers');

/* Validar que falla cuando se intenta acceder con ID inválido */
test('TC03-NEG.1 - Fallar con ID de producto inválido', async ({ request }) => {
  // Usar un ID que no existe
  const idInvalido = 99999;

  // Hacer llamada POST a /view con ID inválido
  const productResponse = await request.post(`${API}/view`, {
    data: { id: idInvalido },
  });

  // El servidor responde con éxito pero sin datos válidos
  const productData = await productResponse.json();

  // Verificar que la descripción está vacía o no existe correctamente
  expect(productData.desc).toBeFalsy();
});

/* Validar que la descripción no es un número */
test('TC03-NEG.2 - Verificar que la descripción NO es un número', async ({
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

  // Verificar que la descripción NO es un número
  expect(typeof productData.desc).not.toBe('number');
});

/* Validar que la descripción NO es null */
test('TC03-NEG.3 - Verificar que la descripción NO es null', async ({
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

  // Verificar que la descripción NO es null
  expect(productData.desc).not.toBeNull();
});

/* Validar que la descripción NO tiene menos de 5 caracteres */
test('TC03-NEG.4 - Verificar que descripción NO tiene menos de 5 caracteres', async ({
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

  // Verificar que la descripción tiene al menos 5 caracteres (NO puede tener menos)
  expect(productData.desc.length).not.toBeLessThan(5);
});

/* Validar que la descripción no es un array */
test('TC03-NEG.5 - Verificar que la descripción NO es un array', async ({
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

  // Verificar que la descripción NO es un array
  expect(Array.isArray(productData.desc)).toBe(false);
});

/* Validar fallo cuando no se envía el ID requerido */
test('TC03-NEG.6 - Fallar cuando no se envía el ID', async ({ request }) => {
  // Hacer llamada POST a /view sin ID
  const productResponse = await request.post(`${API}/view`, {
    data: {},
  });

  const productData = await productResponse.json();

  // Sin ID, la descripción debe estar vacía o falsa
  expect(productData.desc).toBeFalsy();
});

/* Validar que múltiples productos no tienen descripción vacía */
test('TC03-NEG.7 - Validar que NINGÚN producto tiene descripción vacía', async ({
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

    // Verificar que la descripción NO está vacía
    expect(productData.desc).not.toBeFalsy();
    expect(productData.desc.trim()).not.toBe('');

    console.log(
      `✓ Producto ${i + 1}: ${productData.title} NO tiene descripción vacía`,
    );
  }
});
