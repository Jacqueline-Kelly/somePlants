const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const { pool, prepareDB } = require('../database/db.js');
const router = require('./routes/routes.js');
dotenv.config();

// prepareDB(pool) // uncomment to recreate db

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use('/api', router);

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'))
})

app.listen(process.env.SERVERPORT, (err) => {
  if (err) {
    throw new Error(err)
  }
  console.log(`Port listening on ${process.env.SERVERPORT}`)
});