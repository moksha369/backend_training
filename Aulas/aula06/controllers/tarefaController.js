const model = require("../models/tarefaModel");

const listarTarefas = (req, res) => {
  res.json(model.lister());
};

const criarTarefa = (req, res) => {
  const novaTarefa = model.criar(req.body);
  res.status(201).json(novaTarefa);
};

const obterTarefa = (req, res) => {
 const { id } = req.params;
 const tarefaEncontrada = model.obter(id);
 if (tarefaEncontrada) return res.json(tarefaEncontrada);
  res.status(404).json({ msg: "Tarefa não encontrada"});
};

const atualizarTarefa = (req, res) => {
  const { id } = req.params;
  const tarefaEncontrada = tarefas.find((item) => item.id == id);
  if (tarefaEncontrada) {
    tarefaEncontrada.nome = req.body.nome;
    tarefaEncontrada.concluida = req.body.concluida;
    return res.json(tarefaEncontrada);
  }
  res.status(404).json({ msg: "Tarefa não encontrada"});
}

const removerTarefa = (req, res) => {
  const { id } = req.params;
  const posicao = tarefas.findIndex((item) => item.id == id);
  if( posicao >= 0) {
    tarefas.splice(posicao, 1);
    return res.status(204).end().atualizarTarefa
  }
  res.status(404).json({ msg: "Tarefa não encontrada"})
}

module.exports = { listarTarefas, criarTarefa, obterTarefa, atualizarTarefa, removerTarefa };
