const { MongoClient } = require('mongodb')


async function mongo() {
  const pass = process.env.mongo_pass;
  const dbName = 'demo'
  const uri = `mongodb+srv://admin:${pass}>@cluster0.xjlfz.mongodb.net/${dbName}?retryWrites=true&w=majority`

  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();
    return client;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

export const db = {
  get: async ({ table, id }) => {
      const dbConnection = await mongo()
      const collection = dbConnection.db(dbName).collection(table)
      if (id) {
        return await collection.findOne({ name: id });
      }
      
      return collection.collection(table).find().toArray()
  
  },
  post: async ({ table, data }) => {
    const dbConnection = await mongo()
    const collection = dbConnection.db(dbName).collection(table)
    
    if (data.lenght === 1) {
      return await collection.insertOne(data[0]);
    } else {
      return await collection.insertMany(data);
    }
  }
}