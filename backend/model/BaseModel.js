const mongoDb = require('mongodb').MongoClient

const url = 'mongodb://127.0.0.1:27017';

const dbName = 'CookingReceipeEbook';

let dbInstance = null;

async function ConnectDatabase(){
    if (dbInstance) {
        return dbInstance;
      }
    
    const client = await mongoDb.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    dbInstance = client.db(dbName);

    return dbInstance;
}


class BaseModel { 
    constructor(){
        this.db = ConnectDatabase()
    }
}

module.exports = BaseModel


