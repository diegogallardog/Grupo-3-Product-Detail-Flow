// Importa las funciones test y expect del framework Playwright
// test → define un caso de prueba
// expect → realiza las validaciones/aserciones
const { test, expect } = require('@playwright/test');

// Importa la URL base de la API desde helpers.js
// API = 'https://api.demoblaze.com'
const { API } = require('../helpers');

// Test 1: Verificar que el listado de productos está disponible
test('GET /entries - Obtener listado de productos', async ({ request }) => {
  // Hacemos la llamada GET al endpoint /entries
  const response = await request.get(`${API}/entries`);

  // Verificamos que el status es 200
  expect(response.status()).toBe(200);

  // Convertimos la respuesta a objeto JS
  const data = await response.json();

  // Verificamos que el array Items existe y tiene productos
  expect(data.Items).toBeDefined();
  expect(data.Items.length).toBeGreaterThan(0);
});

// Test 2: Verificar que el detalle de un producto específico está disponible
test('POST /view - Obtener detalle de producto especifico', async ({
  request,
}) => {
  // Primero obtenemos el listado para tomar el id dinámicamente
  const entriesResponse = await request.get(`${API}/entries`);
  const entriesData = await entriesResponse.json();

  // Tomamos el id del primer producto del array Items
  const primerProductoId = entriesData.Items[0].id;

  // Hacemos la llamada POST a /view con ese id
  const response = await request.post(`${API}/view`, {
    data: { id: primerProductoId },
  });

  // Verificamos que el status es 200
  expect(response.status()).toBe(200);

  // Convertimos la respuesta a objeto JS
  const data = await response.json();

  // Verificamos que los campos requeridos existen
  expect(data).toHaveProperty('cat');
  expect(data).toHaveProperty('desc');
  expect(data).toHaveProperty('id');
  expect(data).toHaveProperty('img');
  expect(data).toHaveProperty('price');
  expect(data).toHaveProperty('title');

  // Verificamos que los campos tienen valores válidos
  expect(data.title).toBeTruthy();
  expect(data.desc).toBeTruthy();
  expect(data.price).toBeGreaterThan(0);
});
