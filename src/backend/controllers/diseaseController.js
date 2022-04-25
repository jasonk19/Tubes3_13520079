const { isValid } = require("./validation");
const db = require("../database/db")

// @desc    Get Diseases
// @route   /api/disease
const getDiseases = async (req, res) => {
  const diseases = await db.promise().query("SELECT * FROM penyakit");
  res.status(200).json(diseases[0]);
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
    try {
      db.promise().query(`INSERT INTO penyakit (nama_penyakit, seq_dna) VALUES ('${result.data.name}', '${result.data.dna_sequence}')`)
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = {
  getDiseases,
  postDisease
}