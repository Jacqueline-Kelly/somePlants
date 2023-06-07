const express = require('express');
const { getZipcode, postPlant } = require('../controllers/controllers.js');
const router = express.Router();

router.get('/', getZipcode);
router.post('/', postPlant);

module.exports = router;