/**
 * Drops everything from 'balance' database
 */
 
let MongoClient = require('mongodb').MongoClient;
let bro = require('logbro');

MongoClient.connect("mongodb://localhost:27017/balance", (err, db) => {
  if (err) {
    bro.error('Could not clear database. ', err);
  }
  db.dropDatabase().then(() => {
    process.exit();
  });
});