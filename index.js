const express = require('express')
// const packageName = require('packageName')
const cors = require('cors')
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express()
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.nrfxvyb.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
      const myTasks = client.db('todo-db').collection('mytasks')
      

      app.post('/mytasks', (req, res) => {
        const taskDescription = req.body;
        const result = myTasks.insertOne(taskDescription);
        res.send(result)
      })

    } finally {

    }
  } run().catch(err => console.error(err));

app.get('/', (req, res)=>{
    res.send('Server is running')
})

app.listen(port, ()=> {
    console.log(`server is runnning on: ${port}`);
})
