const path = require('path');
const express = require('express');
const { pool, prepareDB } = require('../database/db.js');

// prepareDB(pool) // uncomment to recreate db

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'dist')));
app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'))
})

app.listen(3000);