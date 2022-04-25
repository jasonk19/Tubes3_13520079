const { isValid } = require("./validation");

// @desc    Get Diseases
// @route   /api/disease
const getDiseases = (req, res) => {
  let diseases = [
    {
      name: "Pusing",
      dna_sequence: "ACTTGACGATCGTAGCTAGCTGAG"
    },
    {
      name: "Tidur",
      dna_sequence: "CGATCGATCGACTTGCCGCTCGTCGCTCGCTGTG"
    }
  ]
  res.status(200).json(diseases);
}

const postDisease = (req, res) => {
  if (!isValid(req.body.dna_sequence)) {
    const result = {
      data: {},
      message: "Invalid Sequence"
    }
    res.status(200).json(result);
  } else {
    const result = {
      data: {
        name: req.body.name,
        dna_sequence: req.body.dna_sequence,
      },
      message: "Success"
    }
    res.status(200).json(result);
  }
}

module.exports = {
  getDiseases,
  postDisease
}