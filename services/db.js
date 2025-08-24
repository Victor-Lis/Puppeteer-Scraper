const { MongoClient } = require("mongodb");

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME;

class Database {
  db = null;

  constructor() {
    this.client = new MongoClient(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  async connect() {
    await this.client.connect();
    console.log("Conectado ao MongoDB para manipulação de dados.");
    this.db = this.client.db(DB_NAME);
    return this.db;
  }

  async close() {
    try {
      if (this.client) {
        await this.client.close();
      }
    } catch (error) {
      console.error("Erro ao fechar a conexão com o MongoDB:", error);
    } finally {
      this.client = null;
      this.db = null;

      console.log("Conexão com o MongoDB fechada.");
    }
  }

  async getDatabase() {
    if (!this.db) {
      await this.connect();
    }
    return this.db;
  }

  async insertInCollection({ name, data }) {
    const collection = this.db.collection(name);
    const result = await collection.insertMany(data);
    return result;
  }
}

module.exports = { Database };
