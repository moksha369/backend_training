import { Tarefa } from './modelo.js';

async function adicionarTarefa(nome) {
  const tarefa = new Tarefa(nome);
  await tarefa.inserir();
}

async function buscarTarefa(nome) {
  const tarefa = new Tarefa(nome);
  await tarefa.buscar(); 
  return tarefa.id ? tarefa : null;
}

async function atualizarTarefa(nome, concluida) {
  const tarefa = new Tarefa(nome);
  await tarefa.buscar();

  if (tarefa.id) {
    tarefa.concluida = concluida;
    await tarefa.alterar();
  } else {
    console.log(`Tarefa "${nome}" não encontrada para atualização.`);
  }
}

async function removerTarefa(nome) {
  const tarefa = new Tarefa(nome);
  await tarefa.buscar();

  if (tarefa.id) {
    await tarefa.deletar();
  } else {
    console.log(`Tarefa "${nome}" não encontrada para remoção.`);
  }
}

export { adicionarTarefa, buscarTarefa, atualizarTarefa, removerTarefa };