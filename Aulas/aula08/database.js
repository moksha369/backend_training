const { MongoClient } = require("mongodb");
const url = "mongodb+srv://5eeyouindarkness:YdlApMKo2EVYHpoR@cluster0.bi3it7x.mongodb.net/";
const client = new MongoClient(url);

let db = null;

    async function conecta() {
        try {
            await client.connect();
            return client.db("agenda"); 
        } catch (e) {
            console.log("Erro ao conectar ao MongoDB", 
              e.message);
        }
    }

module.exports = conecta;