const { kmpMatching, similarityFinding } = require("./stringmatch");
const { isValid } = require("./validation");
const { validateSearchInput } = require("./regex");
const db = require("../database/db");

const getResults = async (req, res) => {
  const { search } = req.query;

  let filter;

  if (search != undefined) {
    filter = validateSearchInput(search);
  }


  let filteredResults = [];
  const resultQuery = await db.promise().query("SELECT * FROM hasil");
  const results = resultQuery[0];

  if (filter == undefined) {
    filteredResults = results;
  } else {
    if (filter === search) {
      filteredResults = results.filter((result) => 
        result.tanggal.toLowerCase().indexOf(filter.toLowerCase()) !== -1
      )
    } else if (filter[0] === search) {
      filteredResults = results.filter((result) => 
        result.disease_name.toLowerCase().indexOf(filter[0].toLowerCase()) !== -1
      )
    } else {
      if (filter.get('tanggal') !== 'undefined' && filter.get('penyakit') !== 'undefined') {
        filteredResults = results.filter((result) => 
          result.tanggal.toLowerCase().indexOf(filter.get('tanggal').toLowerCase()) !== -1 && result.disease_name.toLowerCase().indexOf(filter.get('penyakit')[0].toLowerCase()) !== -1
        )  
      }
    }
  }

  res.status(200).json(filteredResults)
}

const postResult = (req, res) => {
  const disease_dna_sequence = req.body.disease_dna_sequence;
  const patient_dna_sequence = req.body.patient_dna_sequence;

  if (!isValid(patient_dna_sequence)) {
    const result = {
      data: {},
      message: "Invalid Sequence"
    }
    res.status(200).json(result);
  } else {
    const position = kmpMatching(patient_dna_sequence, disease_dna_sequence);
    let similarity;
    let status;
    if (position != -1) {
      similarity = 100;
      status = "True";
    } else {
      similarity = similarityFinding(patient_dna_sequence, disease_dna_sequence);
      if (similarity >= 80) {
        status = "True";
      } else {
        status = "False";
      }
    }

    const result = {
      data: {
        date: req.body.date,
        name: req.body.name,
        disease: req.body.disease,
        similarity: similarity,
        status: status
      },
      message: "Success"
    }
    try {
      db.promise().query(`INSERT INTO hasil (tanggal, nama, disease_name, similarity, status) VALUES ('${result.data.date}', '${result.data.name}', '${result.data.disease}', '${result.data.similarity}', '${result.data.status}')`);
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = {
  getResults,
  postResult
}