const { pool } = require('../../database/db.js');

module.exports.postPlant = (req, res) => {
  let usda_id;
  try {
    const { name, version, zipcode } = req.body;
    pool.query("SELECT * FROM usda WHERE scientific_name = $1;", [name]) // find this submission's plant's usda id
    .catch(err => {
      throw new Error (err);
    })
    .then((data) => {
      if (!data.rows.length) {
        throw new Error ('Could not find plant with this name!')
      }

      usda_id = data.rows[0].id;

      pool.query("SELECT COUNT(*) FROM zipcodes_plants WHERE zipcode = $1 AND usda_id = $2;", [zipcode, usda_id]) // find if there is already a record of this plant in the specified zip code
      .then((data) => {

        if (data.rows[0].count === "0") { // inserting new native plant to this zip code!
          pool.query("INSERT INTO zipcodes_plants(usda_id, zipcode) VALUES ($1, $2) RETURNING id;", [usda_id, zipcode])
          .then((data) => {
            res.status(201).send({id: data.rows[0].id});
          })
          .catch(err => {
            throw new Error (err);
          })
        } else { // there's already a submission for the plant in this zipcode so lets increment submission count

          pool.query("UPDATE zipcodes_plants SET submission_count = submission_count + 1 WHERE usda_id = $1 AND zipcode = $2 RETURNING id;", [usda_id, zipcode])
          .then((data) => {
            res.status(201).send({id: data.rows[0].id});
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
    res.status(200);
  } catch(err) {
    res.status(501);
  }
}