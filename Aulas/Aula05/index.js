// Importa o framework
const express = require("express");

//importa middleware de terceiros
const cors = require('cors');

//importa middleware de rota
const router = require('./routerTarefa');

// Cria uma instancia de aplicação
const app = express();

// middlewae embutido ou integrado
app.use(express.json());
//?param1=valor&param2
app.use(express.urlencoded({ extended: false}));

//middleware de terceriros
app.use(cors);

// app de terceiros
app.use(cors());

// middleware de aplicação
app.use((req, res, next) => {
    console.log("passei aqui!");
    next();
})

app.use("/tarefas", router);

//middleware de erro
app.use((err, req, res, next) => {
    console.log(err.message);
    res.status(500).send("Algo de errado não está certo");
})

// inicializar a aplicação
app.listen(3000, ()=> {
    console.log("App está ON!");
});

