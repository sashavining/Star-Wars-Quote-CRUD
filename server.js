const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient


MongoClient.connect('mongodb+srv://sashavining:iQ6R1o6OKMG9Dafj@cluster0.vx8ec.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true })
.then(client => {
  console.log('Connected to Database')
})
.catch(error => console.error(error))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.post('/quotes', (req, res) => {
    if (err) return console.error(err)
    console.log(req.body)
})


// stopped at 'changing the database'