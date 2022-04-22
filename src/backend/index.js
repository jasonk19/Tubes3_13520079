const express = require('express');
const port = 5000
const bodyParser = require('body-parser');
const app = express()

// body parser as middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Requests
app.use('/api', require('./routes/disease'));
app.use('/api', require('./routes/result'));

app.listen(port, () => console.log(`Server running on port ${port}`));