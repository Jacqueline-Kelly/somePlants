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
const dataPath = path.join(__dirname, "../../../Downloads/usdaplants.csv");

const prepareDB = async(pool) => {
  try {
    await pool.query("DROP TABLE IF EXISTS usda, comments, zipcode_plant, tags CASCADE")
    console.log('Dropped all Tables')
    executeQuery(pool, buildUSDATableCommand, buildZipcode_PlantsTableCommand, buildCommentsTableCommand, buildTagsTableCommand, () => readData(insert)) // all tables are dependent on the USDA table, and once USDA table is built we can also read and then insert the data from starter csv file

  } catch(err) {
    console.log(err);
  }
}

const executeQuery = (pool, command, ...cbCommands) => {
  pool.connect()
  .then(client => {
    client.query(command)
    .then(() => {
      client.release();
      console.log('Finished executing:', command);
      cbCommands.forEach(command => {
        if (typeof command === "string") {
          executeQuery(pool, command); // query command
        } else {
          command(); // function
        }
      })
    })
  })
}

// read data files
const readData = (cb) => {
  return fs.createReadStream(dataPath)
    .pipe(csv())
    .on("data", (row) => {
      rawData.push(row);
    })
    .on("end", () => {
      console.log("FINISHED PARSING")
      cb()
    })
    .on("error" , (err) => {
      console.log(err.message)
    })
}

// extract relevant data and insert to postgres
const insert = () => {
  console.log('inserting to database');
  let insertPromises = rawData.map((plant) => new Promise((resolve, reject) =>
      pool.connect().then(client => {
        client.query('INSERT INTO usda(id, scientific_name, common_name) VALUES($1, $2, $3);', [plant["betydb.species.id"], plant.ScientificName, plant.CommonName])
        .then(() => {
          client.release();
          resolve();
        })
        .catch((err) => reject(err));
      })
    )
  )
  Promise.all(insertPromises).then(() => {
    console.log('Finished inserting to databases')
  })
}
const buildUSDATableCommand = "CREATE TABLE usda (id SERIAL PRIMARY KEY UNIQUE NOT NULL, scientific_name VARCHAR(100) NOT NULL, common_name VARCHAR(100) NOT NULL)";

const buildZipcode_PlantsTableCommand = "CREATE TABLE zipcode_plant(id SERIAL PRIMARY KEY UNIQUE NOT NULL, submission_count int NOT NULL DEFAULT 1, usda_id INT REFERENCES usda(id) NOT NULL, zipCode VARCHAR(5) NOT NULL)";

const buildCommentsTableCommand = "CREATE TABLE comments (id SERIAL PRIMARY KEY UNIQUE NOT NULL, comment text NOT NULL, zipcode_plant_id INT NOT NULL REFERENCES zipcode_plant(id))";

const buildTagsTableCommand = "CREATE TABLE tags(id SERIAL PRIMARY KEY UNIQUE NOT NULL, characteristic VARCHAR(50) NOT NULL, zipcode_id INT REFERENCES zipcode_plant(id) NOT NULL)"

prepareDB(pool)