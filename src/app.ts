import express from 'express';
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = 3000;

app.use(express.json());

const uri = "mongodb+srv://admin:TZfuObZEL9K2OXaz@vitality-gaia.joxmt67.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

client.connect();
const db = client.db('banco_nao_relacional');
const Banco_mongo = db.collection('armazenamento');

async function insertJson(json:any) {
    try {
        const result = await Banco_mongo.insertOne({ "json": json, "convertido": false });
        console.log("Enviado com sucesso.")
        return result;
    } catch (error) {
      console.error("Erro ao inserir no MongoDB:", error);
      throw error;
    }
  }

app.post('/estacao-json', (req, res) => {
    res.set('Content-Type', 'application/json');
    res.set('x-api-key', 'soijd7ehdhwdh7a3ihaih');

    //console.log('Dados recebidos do Arduino:');
    //console.log(req.body);
  
    res.status(200).send('Dados recebidos com sucesso!' + req.body);
    
    insertJson(req.body)
});

app.listen(port, () => {
  console.log(`Servidor executando em http://localhost:${port}`);
});