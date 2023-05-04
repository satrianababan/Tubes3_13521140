const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
// const dotenv = require('dotenv');

// Load environment variables from .env file
// dotenv.config();

// Create a new MongoDB client
const uri = 'mongodb+srv://satrianababan:5NqJqp4MvUw1xjpn@cluster0.2wfkycp.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to the MongoDB server
async function connect() {
  try {
    await client.connect();
    console.log('Connected to MongoDB!');
  } catch (err) {
    console.log('Unable to connect to MongoDB:', err);
    process.exit(1);
  }
}

// Make connection with a collection in the database
function openCollection(collectionName) {
  return client.db('tubes3_stima').collection('qna');
}


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = 6000;

app.get('/qna/get', async (req, res) => {

  try {
    await client.connect();

    const db = client.db('tubes3_stima');
    const collection = db.collection('qna');

    const query = {};

    const result = await collection.find(query).toArray();

    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching data from database');
  } finally {
    await client.close();
  }
});

app.post('/qna/post', async (req, res) => {

  try {
    await client.connect();

    const db = client.db('tubes3_stima');
    const collection = db.collection('qna');

    const doc = { 'question': 'kucing apa yang selalu benar?', 'answer': 'kucing ga wrong' };
    collection.insertOne(doc, (err, result) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Added document:', result.ops[0]);
    });

    const { question, answer } = req.body;
    const result = await collection.insertOne({ question, answer });
    res.send(`Inserted new question with ID: ${result.insertedId}`);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching data from database');
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});


// module.exports = {
//   connect,
//   openCollection
// };