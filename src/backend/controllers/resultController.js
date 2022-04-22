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
  res.set('Access-Control-Allow-Origin', '*');
  res.status(200).json(results)
}

const postResult = (req, res) => {
  const result = {
    date: req.body.date,
    name: req.body.name,
    disease_name: req.body.disease_name,
    similarity: parseInt(req.body.similarity),
    status: req.body.status
  }
  console.log(result)
  res.status(200).send("Result successfully sended")
}

module.exports = {
  getResults,
  postResult
}