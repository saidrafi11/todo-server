const express = require('express')
// const packageName = require('packageName')
const cors = require('cors')
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express()
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.nrfxvyb.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
      const myTasks = client.db('todo-db').collection('mytasks')
      const allCompleatedTasks = client.db('todo-db').collection('allCompleatedTasks')
      const allComment = client.db('todo-db').collection('allcomments')
      

      app.post('/mytasks', (req, res) => {
        const taskDescription = req.body;
        const result = myTasks.insertOne(taskDescription);
        res.send(result)
      })

    //   app.get('/mytasks', async (req, res) => {
    //     let query = {}
    //     const email = req.query.email
    //     if (email) {
    //       query = {
  
    //         sellerEmail: email
  
    //       }
    //     }
    //     const myproducts = await productCollection.find(query).toArray()
    //     res.send(myproducts)
    //   })

    app.get('/mytasks', async (req, res) => {

        const email = req.query.email
        
        
        const query = { userEmail: email }
        const mytasks = await myTasks.find(query).toArray()
        res.send(mytasks)
      })

      app.get('/compleatedtasks', async (req, res) => {

        const email = req.query.email
        
        
        const query = { userEmail: email }
        const myCompleatedTasks = await allCompleatedTasks.find(query).toArray()
        res.send(myCompleatedTasks)
      })
      app.get('/comment', async (req, res) => {

        const id = req.query.id
        
        
        const query = { _id: id }
        const comments = await allComment.find(query).toArray()
        res.send(comments)
      })

      app.post('/compleatedtasks', (req, res) => {
        const compleatedTasks = req.body;
        const result = allCompleatedTasks.insertOne(compleatedTasks);
        res.send(result)
      })
      app.post('/addcomment', (req, res) => {
        const compleatedTasks = req.body;
        const result = allComment.insertOne(compleatedTasks);
        res.send(result)
      })

      app.delete('/deletetask/:id', async(req, res) =>{
        const id = req.params.id;
        const query = { _id: ObjectId(id)}
        const result = await myTasks.deleteOne(query);
        console.log('trying to delete', id)
        res.send(result)
      }
      )

    //   app.put('/addcomment/:id', async (req, res) => {
    //     const id = req.params.id;
    //     const filter = { _id: id }
    //     const comment = req.body;
    //     console.log(comment);
    //     const option = { upsert: true };
    //     const edited = {
    //       $set: {
    //         comment: comment
    //       }
    //     }
    //     const result = await allCompleatedTasks.updateOne(filter, edited, option);
    //     console.log(result);
    //     res.send(result)
    //   })






    } finally {

    }
  } run().catch(err => console.error(err));

app.get('/', (req, res)=>{
    res.send('Server is running')
})

app.listen(port, ()=> {
    console.log(`server is runnning on: ${port}`);
})
