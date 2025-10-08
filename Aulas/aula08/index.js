const conecta = require("./database");

async function inserir (){
    const db = conecta();
    const collection = await db.collection('tarefas');
    const resultado = await collection.insertOne({
        nome: "Estudar MongoDB",
        concluida: false
});

console.log(resultado)
}

async function buscar(nomeTarefa) {
    const db = await conecta();
    const collection = await db.collection("tarefas");
    const resultado = collection.findOne({ nome: nomeTarefa});
    console.log(resultado);
}

async function alterar(nomeTarefa, nomeAlterado, concluidaAlterado){
    const db = await conecta();
    const collection = await db.collection("tarefas");
    const resultado = collection.updateOne({ nome: nomeTarefa}, { $set: {nome: nomeAlterado,
        concluida: concluidaAlterado}});
    console.log(resultado);
}

async function remover(nomeTarefa){
    const db = await conecta();
    const collection = await db.collection("tarefas");
    const resultado = collection.deleteOne({ nome: nomeTarefa});
    console.log(resultado);
}

async function main(){
    while(true){
        console.log("Menu principal");
        console.log("1 - Criar tarefa");
        console.log("2 - Buscar tarefa");
        console.log("3 - Alterar tarefa");
        console.log("4 - Remover tarefa");
        console.log("5 - Sair");
    const opcao = readline.question("Entre com sua opção: ");
    switch(opcao) {
        case 1: {
            const nome = readline.question("Informe o nome da tarefa:");
            await inserir(nome);
            break;
        }
        case 2: {
            const nome = readline.question("Informe o nome da tarefa:");
            await buscar(nome);
            break;
        }
        case 3: {
            const nome = readline.question("Informe o nome da tarefa:");
            await alterar(nome);
            break;
        }
        case 4: {
            
            break;
        }
        case 5: process.exit(0);
    }
    }
}