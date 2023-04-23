const { MongoClient } = require('mongodb');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const app = express();
require("dotenv").config();
app.use(cors());

const url = process.env.DATABASE  //This is the path of mongoDB
// const url = 'mongodb+srv://animesh624d:animeshdon@cluster0.8bknpgp.mongodb.net/test'
const client = new MongoClient(url);  
const database = 'newdb';

async function insert(){
    let result=await client.connect();  // this will return promise thats why we have used await to deal with promise and now await can only be used inside async function so we have used async function
//   Data fetch krne me time lgg jaata h isliye hum promise use krte h
  let db=result.db(database);
  let collection = db.collection('newcol');
  const jsonString = fs.readFileSync('sample_data.json');
  const items = JSON.parse(jsonString);

    const result1 = await collection.insertMany(items);

    console.log(`${result1.insertedCount} documents were inserted into the collection`);
}
// insert();
console.log("hello");

app.get('/query1', async (req, res) => {
  try {
    let result=await client.connect();

    let db=result.db(database);
    let collection = db.collection('newcol');

    const users = await collection.find({
      $and: [
        { income: { $lt: "5" } },
        { car: { $in: ['BMW', 'Mercedes'] } }
      ]
    }).toArray();

    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  } finally {
    await client.close();
  }
});



app.get('/query2', async (req, res) => {
    try {
      let result=await client.connect();
  
      let db=result.db(database);
      let collection = db.collection('newcol');
  
      const users = await collection.find({
        $and: [
          { phone_price: { $gt: "10000" }  },
          { gender: { $in: ["Male"] } }
        ]
      }).toArray();
  
      res.send(users);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    } finally {
      await client.close();
    }
  });
  app.get('/query3', async (req, res) => {
    const query = {
        last_name: /^M/,
        $expr: {
          $gt: [ { $strLenCP: "$quote" }, 15 ]
        },
        $where: function() {
            return this.email.includes(this.last_name);
          }
      };
    try {
      let result=await client.connect();
  
      let db=result.db(database);
      let collection = db.collection('newcol');
  
      const users = await collection.find(query).toArray();
  
      res.send(users);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    } finally {
      await client.close();
    }
  });
  app.get('/query4', async (req, res) => {
    const query = {
        car: { $in: ['BMW', 'Mercedes', 'Audi'] },
        email: { $regex: /^\D*$/ }
      };
    try {
      let result=await client.connect();
  
      let db=result.db(database);
      let collection = db.collection('newcol');
  
      const users = await collection.find(query).toArray();
  
      res.send(users);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    } finally {
      await client.close();
    }
  });

  app.get('/query5', async (req, res) => {
    try {
      let result=await client.connect();
  
      let db=result.db(database);
      let collection = db.collection('newcol');
  
      const users = await collection.aggregate([
        {
          $group: {
            _id: '$city',
            user_count: { $sum: 1 },
            avg_income: { $avg: { $toDouble: '$income' } }
          }
        },
        {
          $sort: { user_count: -1 }
        },
        {
          $limit: 10
        }
      ]).toArray();

  
      res.send(users);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    } finally {
      await client.close();
    }
  });
  const port = process.env.PORT;
  // const port=4000;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });

