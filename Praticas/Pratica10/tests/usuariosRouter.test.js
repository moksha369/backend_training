const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

let savedId = null; 
let savedToken = null;

describe('Testes de Integração para o Recurso /usuarios', () => {
  test('Deve criar um novo usuário e retornar status 201', async () => {
    const response = await request
      .post('/usuarios')
      .send({ 
        email: 'usuario@email.com', 
        senha: 'abcd1234' 
      })
      .expect('Content-Type', /json/) 
      .expect(201); 
    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('email', 'usuario@email.com');

    savedId = response.body._id;
  });

  test('Deve retornar status 422 ao tentar criar usuário sem payload', async () => {
    const response = await request
      .post('/usuarios')
      .send({}) 
      .expect('Content-Type', /json/)
      .expect(422);
    expect(response.body).toHaveProperty('msg', 'Email e Senha são obrigatórios');
  });

  test('Deve realizar o login e retornar status 200 com token', async () => {
    const response = await request
      .post('/usuarios/login')
      .send({ 
        email: 'usuario@email.com', 
        senha: 'abcd1234' 
      })
      .expect('Content-Type', /json/)
      .expect(200); 

    expect(response.body).toHaveProperty('token');
    savedToken = response.body.token; 
  });

  test('Deve retornar status 401 ao tentar fazer login sem credenciais', async () => {
    const response = await request
      .post('/usuarios/login')
      .send({})
      .expect('Content-Type', /json/)
      .expect(401); 
    expect(response.body).toHaveProperty('msg', 'Credenciais inválidas');
  });

  test('Deve renovar o token e retornar status 200', async () => {
    expect(savedToken).not.toBeNull(); 

    const response = await request
      .post('/usuarios/renovar')
      .set('authorization', `Bearer ${savedToken}`) 
      .expect('Content-Type', /json/)
      .expect(200); 
    expect(response.body).toHaveProperty('token');
  });

  test('Deve retornar status 401 com token inválido', async () => {
    const response = await request
      .post('/usuarios/renovar')
      .set('authorization', 'Bearer 123456789')
      .expect('Content-Type', /json/)
      .expect(401); 
      expect(response.body).toHaveProperty('msg', 'Token inválido');
  });

  test('Deve deletar o usuário e retornar status 204', async () => {
    expect(savedId).not.toBeNull();
    expect(savedToken).not.toBeNull();

    await request
      .delete(`/usuarios/${savedId}`)
      .set('authorization', `Bearer ${savedToken}`) 
      .expect(204); 
  });

});