const { kmpMatching, similarityFinding } = require("./stringmatch");
const { isValid } = require("./validation");

const getResults = (req, res) => {
  let results = [
    {
      date: "21 April 2022",
      name: "Lorem ipsum",
      disease_name: "Tidur",
      similarity: 85,
      status: "True"
    },
    {
      date: "22 April 2022",
      name: "Lorem Lorem",
      disease_name: "Tidur",
      similarity: 100,
      status: "True"
    }
  ]
  res.status(200).json(results)
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
    res.status(200).json(result);
  }
}

module.exports = {
  getResults,
  postResult
}