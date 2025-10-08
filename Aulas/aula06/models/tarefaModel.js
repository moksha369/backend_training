const tarefas = [];

const listar = () => {
    return tarefas;
};

const criar = (dados) => {
    const novaTarefa = {
    ...dados,
    id: tarefas.length + 1,
  };
  tarefas.push(novaTarefa);
  return novaTarefa;
};

const obter = (id) => {
    const { id } = req.params;
    const tarefaEncontrada = tarefas.find((item) => item.id === 
  parseInt(id));
  return res.json(tarefaEncontrada);
};

module.exports = { criar, listar, obter };