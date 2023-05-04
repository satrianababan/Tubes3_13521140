
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://satrianababan:Octavianus_28@cluster0.2wfkycp.mongodb.net/?retryWrites=true&w=majority";
const dbName = 'tubes3_stima'


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function main() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
main().catch(console.dir);

const db = client.db('tubes3_stima');
const collection = db.collection('qna');

const doc = { pertanyaan: 'Apa mata kuliah IF semester 4 yang paling seru?', jawaban: 'Yang paling seru STIMA tentunya' };
collection.insertOne(doc, (err, result) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Added document:', result.ops[0]);
});

module.exports = db