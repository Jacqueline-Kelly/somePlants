const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();


// Create new client
const pool = new Pool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  port: process.env.dbport,
});


const rawData = [];
const dataPath = path.join(__dirname, "../../../Downloads/USDA Plants/usdaplants_4-19-2023.csv")

// read data files
const readData = () => {
  return (
    fs.createReadStream(dataPath)
    .pipe(csv())
    .on("data", (row) => {
      rawData.push(row);
    })
    .on("end", () => {
      console.log(rawData, "FINISHED PARSING")
    })
    .on("error" , (err) => {
      console.log(err.message)
    })
  )
}

await pool.connect().then((client) => client.query("DROP TABLE IF EXISTS usda, comments, zipcode_plants"))

const createTables = (command) => {
  return pool.connect()
  .then(client => {
    client.query(command)
    .then(() => {
      client.release();
      console.log('Finished executing', command);
    })
  })
}

const buildUSDATableCommand = "CREATE TABLE usda (id SERIAL PRIMARY KEY UNIQUE NOT NULL, scientific_name VARCHAR(100) NOT NULL, common_name VARCHAR(100) NOT NULL)"
const buildCommentsTableCommand = "CREATE TABLE comments (id SERIAL PRIMARY KEY UNIQUE NOT NULL, comment text NOT NULL, usda_id INT NOT NULL REFERENCES usda(id))"
const buildZipcode_PlantsTableCommand = "CREATE TABLE tags(id SERIAL PRIMARY KEY UNIQUE NOT NULL, tags VARCHAR(80) NOT NULL, usda_id INT REFERENCES usda(id) NOT NULL, zipCode VARCHAR(5) NOT NULL)"


// extract relevant data and insert to postgres
const insert = () => {
  rawData.forEach((plant) => {
    pool.connect()
    .then(client => {
      client.query('INSERT INTO ')
    })
  })
}