import { conectarDb } from './database.js';

class Tarefa {
  static db;
  static collection;

  constructor(nome, concluida = false) {
    this.nome = nome;
    this.concluida = concluida;
    this.id = null; 
  }

  static async inicializar() {
    if (!Tarefa.db || !Tarefa.collection) {
        Tarefa.db = await conectarDb();
        Tarefa.collection = Tarefa.db.collection('tarefas');
    }
  }

  async inserir() {
    await Tarefa.inicializar();
    const resultado = await Tarefa.collection.insertOne({
      nome: this.nome,
      concluida: this.concluida,
    });
    this.id = resultado.insertedId;
    console.log(`Tarefa "${this.nome}" inserida com o id: ${this.id}`);
  }

  async alterar() {
    if (!this.id) {
        throw new Error("Não é possível alterar uma tarefa que ainda não foi inserida.");
    }
    await Tarefa.inicializar();
    await Tarefa.collection.updateOne(
      { _id: this.id }, 
      { $set: { nome: this.nome, concluida: this.concluida } } // Dados a serem atualizados
    );
    console.log(`Tarefa com id "${this.id}" alterada com sucesso.`);
  }

  async deletar() {
    if (!this.id) {
        throw new Error("Não é possível deletar uma tarefa que ainda não foi inserida ou identificada.");
    }
    await Tarefa.inicializar();
    await Tarefa.collection.deleteOne({ _id: this.id }); // Critério de busca pelo _id
    console.log(`Tarefa "${this.nome}" deletada com sucesso.`);
  }

  async buscar() {
    await Tarefa.inicializar();
    const resultado = await Tarefa.collection.findOne({ nome: this.nome });

    if (resultado) {
      this.id = resultado._id;
      this.nome = resultado.nome;
      this.concluida = resultado.concluida;
      console.log(`Tarefa "${this.nome}" encontrada.`);
    } else {
      console.log(`Tarefa "${this.nome}" não encontrada.`);
    }
  }
}

export { Tarefa };