const express = require('express');
const router = express.Router();
const { getDiseases, postDisease } = require('../controllers/diseaseController')

router.route('/disease').get(getDiseases).post(postDisease)

module.exports = router;