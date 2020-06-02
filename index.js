const express = require('express')
require('dotenv').config()
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 4200

//Database
const MongoClient = require('mongodb').MongoClient;
const uri =  process.env.DB_PATH
let client = new MongoClient(uri, { useNewUrlParser: true });

const mongo = require('mongodb');


//Middleware
app.use(bodyParser.json())
app.use(cors())


//GET
app.get('/classes', (req, res) => {

    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
    const collection = client.db("power-x-gym").collection("classes");
    collection.find().toArray((err, documents) => {
        if(err){
            console.log(err);
            res.status(500).send({message:err})
            
        }
        else{
            res.send(documents)
        }
    })
    client.close();
    });
})


//POST
app.post('/addClasses', (req, res) => {
    const items = req.body

    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
    const collection = client.db("power-x-gym").collection("classes");
    collection.insertOne(items, (err, result) => {
        if(err){
            console.log(err);
            res.status(500).send({message:err})
            
        }
        else{
            res.send(result.ops[0])
        }
    })
    client.close();
    });
})

app.listen(port, () => console.log(` Server listening at port: ${port}`))