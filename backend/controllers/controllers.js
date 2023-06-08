const { pool } = require('../../database/db.js');
const format = require('pg-format');

const addTag = (tag, id) => {
  pool.query("INSERT INTO tags(tag, zipcodes_plants_id) VALUES($1, $2);", [tag, id]);
}

module.exports.postPlant = (req, res) => {
  let usda_id;
  try {
    let { name, version, zipcode, tags} = req.body;
    name = name.trim();

    let sqlQuery = format("SELECT * FROM usda WHERE %I = %L;", version, name)
    pool.query(sqlQuery) // find this submission's plant's usda id
    .catch(err => {
      throw new Error (err);
    })
    .then((data) => {
      if (!data.rows.length) {
        res.status(400).send('Could not find plant with this name!');
        return
      }

      usda_id = data.rows[0].id;

      pool.query("SELECT COUNT(*) FROM zipcodes_plants WHERE zipcode = $1 AND usda_id = $2;", [zipcode, usda_id]) // find if there is already a record of this plant in the specified zip code
      .then((data) => {

        if (data.rows[0].count === "0") { // inserting new native plant to this zip code!
          pool.query("INSERT INTO zipcodes_plants(usda_id, zipcode) VALUES ($1, $2) RETURNING id;", [usda_id, zipcode])
          .then((data) => {
            tags.forEach(tag => addTag(tag, data.rows[0].id));
            res.status(201).send("Sucessfully added this plant to your zipcode's native list!");
          })
          .catch(err => {
            throw new Error (err);
          })
        } else { // there's already a submission for the plant in this zipcode so lets increment submission count

          pool.query("UPDATE zipcodes_plants SET submission_count = submission_count + 1 WHERE usda_id = $1 AND zipcode = $2 RETURNING id;", [usda_id, zipcode])
          .then((data) => {
            tags.forEach(tag => addTag(tag, data.rows[0].id));
            res.status(201).send("Awesome! This plant has already been reported to be native in your area.");
          })
          .catch(err => {
            throw new Error (err.stack);
          })
        }
      })
    })
  } catch (err) {
    res.status(501);
  }
}

module.exports.getZipcode = (req, res) => {
  try {
    const { zipcode } = req.query;
    pool.query("SELECT scientific_name, common_name, submission_count, usda_id, zipcode, ARRAY_AGG(tags.tag) as tags FROM usda INNER JOIN zipcodes_plants ON usda_id = usda.id INNER JOIN tags on tags.zipcodes_plants_id = zipcodes_plants.id WHERE zipcodes_plants.zipcode = $1 GROUP BY usda.scientific_name, usda.common_name, zipcodes_plants.submission_count, zipcodes_plants.usda_id, zipcodes_plants.zipcode;", [zipcode])
    .then((data) => {
      res.status(200).send(data.rows);
    })
  } catch(err) {
    res.status(501);
  }
}



