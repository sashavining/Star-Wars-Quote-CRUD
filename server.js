const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const req = require('express/lib/request');
const MongoClient = require('mongodb').MongoClient
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.json()) // teaches our server to read JSON with bodyParser middleware

MongoClient.connect('mongodb+srv://sashavining:iQ6R1o6OKMG9Dafj@cluster0.vx8ec.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true })
.then(client => {
  const db = client.db('star-wars-quotes');
  const quotesCollection = db.collection('quotes');
  app.use(bodyParser.urlencoded({ extended: true }));
  app.get('/', (req, res) => {
        db.collection('quotes').find().toArray()
        .then(results => {
            res.render('index.ejs', { quotes: results })
        })
        .catch (error => console.log(error))
   })
   app.post('/quotes', (req, res) => {
       quotesCollection.insertOne(req.body)
        .then(result => {
           res.redirect('/')
        })
        .catch(error => console.log(error))
   })
   app.listen(3000, function() {
    console.log('listening on 3000')
  })
  app.put('/quotes', (req, res) => {
      quotesCollection.findOneAndUpdate(
        { name: 'Yoda' },
        {
            $set: { 
               name: req.body.name,
               quote: req.body.quote
            }
        },
        {
            upsert: true
        }
    ) 
    .then (result => { res.json('Success')})
    .catch (error => console.error(error))
})
app.delete('/quotes', (req, res) => {
  quotesCollection.deleteOne(
      { name: req.body.name}
    )
    .then(result => {
        if (result.deletedCount === 0) {
            return res.json('No quote to delete')
        }
        res.json('Deleted Darth Vadars quote')
    })
    .catch(error => console.error(error))  
})
})
// stopped at 'Changing Yoda's Quotes'
