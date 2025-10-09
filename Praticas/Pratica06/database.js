import { MongoClient } from "mongodb"

const url = "mongodb+srv://Jarbas:becknotend@cluster0.lmnrhrf.mongodb.net/"

const client = new MongoClient(url);

async function conectarDb() {
    try {
      await client.connect();
      console.log("Conectado com sucesso ao MongoDB!");
      return client.db('agenda');
    } catch (error) {
      console.error("Erro ao conectar ao MongoDB:", error);
      process.exit(1); 
    }
  }
  
  export { conectarDb };