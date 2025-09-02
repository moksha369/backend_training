const calcularMediaAluno = require('../src/calcularMediaAluno.js');

describe('calcularMediaAluno', () => {
  test('deve lançar uma exceção se a1 ou a2 forem undefined', () => {
    expect(() => calcularMediaAluno(undefined, 10)).toThrow('Notas a1 ou a2 não informadas');
    expect(() => calcularMediaAluno(10, undefined)).toThrow('Notas a1 ou a2 não informadas');
    expect(() => calcularMediaAluno(undefined, undefined)).toThrow('Notas a1 ou a2 não informadas');
  });

  test('deve lançar uma exceção se a1 ou a2 forem negativas', () => {
    expect(() => calcularMediaAluno(-5, 10)).toThrow('Notas a1 ou a2 não podem ser negativas');
    expect(() => calcularMediaAluno(10, -8)).toThrow('Notas a1 ou a2 não podem ser negativas');
    expect(() => calcularMediaAluno(-2, -7)).toThrow('Notas a1 ou a2 não podem ser negativas');
  });

  test('deve calcular a média ponderada simples quando a3 não é informada', () => {
    expect(calcularMediaAluno(8, 9)).toBeCloseTo(8.6);
  });

  test('deve lançar uma exceção se a3 for negativa', () => {
    expect(() => calcularMediaAluno(8, 9, -10)).toThrow('Nota a3 não pode ser negativa');
  });

  test('deve calcular a média usando a1 e a3 se essa for a melhor combinação', () => {
    expect(calcularMediaAluno(8, 5, 9)).toBeCloseTo(8.6);
  });

  test('deve calcular a média usando a3 e a2 se essa for a melhor combinação', () => {
    expect(calcularMediaAluno(4, 9, 7)).toBeCloseTo(8.2);
  });

  test('deve calcular a média corretamente quando as combinações resultam em médias diferentes', () => {
    expect(calcularMediaAluno(10, 0, 5)).toBeCloseTo(7.0); 
    expect(calcularMediaAluno(0, 10, 5)).toBeCloseTo(8.0); 
  });
});