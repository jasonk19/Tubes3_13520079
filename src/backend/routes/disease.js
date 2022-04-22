const express = require('express');
const router = express.Router();
const getDiseases = require('../controllers/diseaseController')

router.get('/disease', getDiseases)

module.exports = router;