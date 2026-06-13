/**
 * ========================================================
 * TEST CASE 03 - Validación de Descripción del Producto
 * ========================================================
 * Tests para validar que la descripción del producto existe
 * y es válida a través de la API de DemoBlaze.
 * ========================================================
 */

const { test, expect } = require('@playwright/test');
const { API } = require('../helpers');

/* Verifica que la descripción existe en la respuesta de la API */
test('TC03.1 - Verificar que la descripción del producto existe', async ({
  request,
}) => {
  // Obtener el listado de productos
  const entriesResponse = await request.get(`${API}/entries`);
  expect(entriesResponse.status()).toBe(200);

  const entriesData = await entriesResponse.json();
  expect(entriesData.Items.length).toBeGreaterThan(0);

  // Obtener el ID del primer producto
  const primerProductoId = entriesData.Items[0].id;

  // Hacer llamada POST a /view para obtener detalles del producto
  const productResponse = await request.post(`${API}/view`, {
    data: { id: primerProductoId },
  });

  expect(productResponse.status()).toBe(200);

  const productData = await productResponse.json();

  // Verificar que la descripción existe en la respuesta
  expect(productData).toHaveProperty('desc');
  expect(productData.desc).toBeDefined();
});

/* Valida que la descripción no está vacía */
test('TC03.2 - Verificar que la descripción no está vacía', async ({
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

  expect(productResponse.status()).toBe(200);
  const productData = await productResponse.json();

  // Verificar que la descripción no está vacía
  expect(productData.desc).toBeTruthy();
  expect(productData.desc.trim().length).toBeGreaterThan(0);
});

/* Confirma que la descripción es de tipo string */
test('TC03.3 - Verificar que la descripción es de tipo string', async ({
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

  expect(productResponse.status()).toBe(200);
  const productData = await productResponse.json();

  // Verificar que la descripción es un string
  expect(typeof productData.desc).toBe('string');
});

/* Asegura que la descripción tiene longitud mínima válida (≥10 caracteres) */
test('TC03.4 - Verificar que la descripción tiene longitud mínima válida', async ({
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

  expect(productResponse.status()).toBe(200);
  const productData = await productResponse.json();

  // Verificar que la descripción tiene al menos 10 caracteres
  expect(productData.desc.length).toBeGreaterThanOrEqual(10);
});

/* Valida la descripción en múltiples productos (primeros 5) */
test('TC03.5 - Verificar descripción en múltiples productos', async ({
  request,
}) => {
  // Obtener el listado de productos
  const entriesResponse = await request.get(`${API}/entries`);
  expect(entriesResponse.status()).toBe(200);

  const entriesData = await entriesResponse.json();
  expect(entriesData.Items.length).toBeGreaterThan(0);

  // Validar descripción para los primeros 5 productos (o menos si hay menos)
  const productosAValidar = Math.min(5, entriesData.Items.length);

  for (let i = 0; i < productosAValidar; i++) {
    const productId = entriesData.Items[i].id;

    // Obtener detalles del producto
    const productResponse = await request.post(`${API}/view`, {
      data: { id: productId },
    });

    expect(productResponse.status()).toBe(200);
    const productData = await productResponse.json();

    // Validaciones para cada producto
    expect(productData).toHaveProperty('desc');
    expect(productData.desc).toBeTruthy();
    expect(typeof productData.desc).toBe('string');
    expect(productData.desc.trim().length).toBeGreaterThan(0);

    console.log(
      `✓ Producto ${i + 1}: ${productData.title} tiene descripción válida`,
    );
  }
});
