const express = require('express');
const router = express.Router();
const { getResults, postResult } = require('../controllers/resultController')

router.route('/result').get(getResults).post(postResult)

module.exports = router;