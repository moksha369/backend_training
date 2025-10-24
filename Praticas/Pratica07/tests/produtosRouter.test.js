const supertest = require('supertest');

const app = require('../app');

const request = supertest(app);

const url = '/produtos';

let produtoId = null;

const invalidId = '0';
const nonExistentId = '000000000000000000000000'; 

describe('API RESTful /produtos', () => {
  test('POST /produtos - Deve criar um novo produto (Status 201)', async () => {
    const novoProduto = {
      nome: 'Laranja',
      preco: 10.0,
    };

    const response = await request.post(url).send(novoProduto);

    expect(response.status).toBe(201);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body._id).toBeDefined(); 
    expect(response.body.nome).toBe(novoProduto.nome);
    expect(response.body.preco).toBe(novoProduto.preco);

    produtoId = response.body._id;
  });

  test('POST /produtos - Deve falhar na validação (Status 422)', async () => {
    const response = await request.post(url).send({}); 

    expect(response.status).toBe(422);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.msg).toBe('Nome e preço do produto são obrigatórios');
  });

  test('GET /produtos - Deve retornar uma lista de produtos (Status 200)', async () => {
    const response = await request.get(url);

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(Array.isArray(response.body)).toBe(true); 
    expect(response.body.length).toBeGreaterThan(0); 
  });

  test('GET /produtos/:id - Deve retornar um produto específico (Status 200)', async () => {
    const response = await request.get(`${url}/${produtoId}`);

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body._id).toBe(produtoId);
    expect(response.body.nome).toBe('Laranja'); 
    expect(response.body.preco).toBe(10.0);
  });

  test('GET /produtos/:id - Deve falhar com ID inválido (Status 400)', async () => {
    const response = await request.get(`${url}/${invalidId}`);

    expect(response.status).toBe(400);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.msg).toBe('Parâmetro inválido');
  });

  test('GET /produtos/:id - Deve falhar se produto não existir (Status 404)', async () => {
    const response = await request.get(`${url}/${nonExistentId}`);

    expect(response.status).toBe(404);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.msg).toBe('Produto não encontrado');
  });

  test('PUT /produtos/:id - Deve atualizar um produto (Status 200)', async () => {
    const produtoAtualizado = {
      nome: 'Laranja Pera',
      preco: 18.0,
    };

    const response = await request
      .put(`${url}/${produtoId}`)
      .send(produtoAtualizado);

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body._id).toBe(produtoId);
    expect(response.body.nome).toBe(produtoAtualizado.nome);
    expect(response.body.preco).toBe(produtoAtualizado.preco);
  });

  test('PUT /produtos/:id - Deve falhar na validação (Status 422)', async () => {
    const response = await request.put(`${url}/${produtoId}`);

    expect(response.status).toBe(422);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.msg).toBe('Nome e preço do produto são obrigatórios');
  });


  test('PUT /produtos/:id - Deve falhar com ID inválido (Status 400)', async () => {
    const response = await request
      .put(`${url}/${invalidId}`)
      .send({ nome: 'Teste', preco: 1.0 });

    expect(response.status).toBe(400);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.msg).toBe('Parâmetro inválido');
  });

  test('PUT /produtos/:id - Deve falhar se produto não existir (Status 404)', async () => {
    const response = await request
      .put(`${url}/${nonExistentId}`)
      .send({ nome: 'Teste', preco: 1.0 });

    expect(response.status).toBe(404);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.msg).toBe('Produto não encontrado');
  });

  test('DELETE /produtos/:id - Deve deletar um produto (Status 204)', async () => {
    const response = await request.delete(`${url}/${produtoId}`);

    expect(response.status).toBe(204);
    expect(response.body).toEqual({}); 
  });

  test('DELETE /produtos/:id - Deve falhar com ID inválido (Status 400)', async () => {
    const response = await request.delete(`${url}/${invalidId}`);

    expect(response.status).toBe(400);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.msg).toBe('Parâmetro inválido');
  });

  test('DELETE /produtos/:id - Deve falhar se produto já foi deletado (Status 404)', async () => {
    const response = await request.delete(`${url}/${produtoId}`);

    expect(response.status).toBe(404);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.msg).toBe('Produto não encontrado');
  });
});
