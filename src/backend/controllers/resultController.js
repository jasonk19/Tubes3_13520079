const { kmpMatching, hammingDistance } = require("./stringmatch");

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

  const position = kmpMatching(patient_dna_sequence, disease_dna_sequence)
  const similarity = hammingDistance(patient_dna_sequence, disease_dna_sequence, position);
  let status;
  if (similarity >= 80) {
    status = "True";
  } else {
    status = "False";
  }
  
  const result = {
    date: req.body.date,
    name: req.body.name,
    disease: req.body.disease,
    similarity: similarity,
    status: status
  }
  res.status(200).json(result);
}

module.exports = {
  getResults,
  postResult
}