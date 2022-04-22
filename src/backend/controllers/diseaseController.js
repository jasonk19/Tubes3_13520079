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
      dna_sequence: "ACTTACTGATCGATCGTGTACGTG"
    }
  ]
  res.set('Access-Control-Allow-Origin', '*');
  res.status(200).json(diseases);
}

module.exports = getDiseases