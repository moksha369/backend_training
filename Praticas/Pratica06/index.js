import readline from 'readline-sync';
import * as controlador from './controlador.js';

function menu() {
  console.log('\n--- MENU DE TAREFAS ---');
  console.log('1. Adicionar Tarefa');
  console.log('2. Buscar Tarefa');
  console.log('3. Atualizar Tarefa');
  console.log('4. Remover Tarefa');
  console.log('5. Sair');
}

async function escolherOpcao(opcao) {
  switch (opcao) {
    case '1': {
      const nome = readline.question('Digite o nome da tarefa: ');
      await controlador.adicionarTarefa(nome);
      break;
    }
    case '2': {
      const nome = readline.question('Digite o nome da tarefa para buscar: ');
      const tarefaEncontrada = await controlador.buscarTarefa(nome);
      if (tarefaEncontrada) {
        console.log('Tarefa encontrada:', tarefaEncontrada);
      } else {
        console.log('Tarefa nao encontrada.');
      }
      break;
    }
    case '3': {
      const nome = readline.question('Digite o nome da tarefa para atualizar: ');
      const concluidaInput = readline.question('A tarefa foi concluida? (s/n): ');
      const concluida = concluidaInput.toLowerCase() === 's';
      await controlador.atualizarTarefa(nome, concluida);
      break;
    }
    case '4': {
      const nome = readline.question('Digite o nome da tarefa para remover: ');
      await controlador.removerTarefa(nome);
      break;
    }
    case '5':
      console.log('Saindo...');
      process.exit(0);
    default:
      console.log('Opcao invalida. Tente novamente.');
      break;
  }
}

async function main() {
  while (true) {
    menu();
    const opcao = readline.question('Escolha uma opcao: ');
    await escolherOpcao(opcao);
  }
}

main();