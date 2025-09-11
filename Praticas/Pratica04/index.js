const express = require('express');

const app = express();

app.use(express.json());

const tarefas = [
  { id: 1, nome: "Estudar middleware", concluida: false },
  { id: 2, nome: "Praticar Express", concluida: true },
  { id: 3, nome: "Criar API REST", concluida: false }
];

app.use((req, res, next) => {
  const dataHora = new Date().toISOString();
  console.log(`[${dataHora}] ${req.method} ${req.originalUrl}`);
  next();
});

const tarefasRouter = express.Router();

tarefasRouter.get('/', (req, res) => {
  res.json(tarefas);
});

tarefasRouter.get('/:tarefaId', (req, res, next) => {
  const id = parseInt(req.params.tarefaId);
  const tarefa = tarefas.find(t => t.id === id);

  if (!tarefa) {
    return next(new Error('Tarefa não localizada'));
  }

  res.json(tarefa);
});

tarefasRouter.post('/', (req, res) => {
  const { nome, concluida } = req.body;
  
  const novoId = tarefas.length > 0 ? Math.max(...tarefas.map(t => t.id)) + 1 : 1;
  
  const novaTarefa = {
    id: novoId,
    nome,
    concluida: concluida === true 
  };

  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

tarefasRouter.put('/:tarefaId', (req, res, next) => {
    const id = parseInt(req.params.tarefaId);
    const index = tarefas.findIndex(t => t.id === id);

    if (index === -1) {
        return next(new Error('Tarefa não localizada'));
    }

    const { nome, concluida } = req.body;
    tarefas[index].nome = nome ?? tarefas[index].nome;
    tarefas[index].concluida = concluida ?? tarefas[index].concluida;

    res.json(tarefas[index]);
});

tarefasRouter.delete('/:tarefaId', (req, res, next) => {
    const id = parseInt(req.params.tarefaId);
    const index = tarefas.findIndex(t => t.id === id);

    if (index === -1) {
        return next(new Error('Tarefa não localizada'));
    }

    tarefas.splice(index, 1);
    res.status(204).send(); 
});

app.use('/tarefas', tarefasRouter);

app.use((err, req, res, next) => {
  console.error(err.stack); 
  res.status(400).json({ error: err.message });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;