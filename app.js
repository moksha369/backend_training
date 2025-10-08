






























    const { id } = req.params;
    const tarefaEncontrada = tarefas.find((item) => {
        item.id === parseInt(id));
    if(tarefaEncontrada)
        return resizeBy.json(tarefaEncontrada);
    res.status(404).json({msg})
    });









