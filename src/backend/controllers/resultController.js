const { kmpMatching, similarityFinding } = require("./stringmatch");
const { isValid } = require("./validation");
const { validateSearchInput } = require("./regex");
const db = require("../database/db");

function sqlDateFormat(input){
  const inputArray = input.split(/[\.\/\- ]/)
  day = ""
  month = ""
  year = ""
  switch(true){
    case (inputArray[0].length == 1):
      day = "0" + inputArray[0]
      break
    case (inputArray[0].length == 2):
      day = inputArray[0]
      break
    default:
        return undefined
  }
  
  switch(true){
    case (inputArray[1] == "January" || inputArray[1]== "Jan" || inputArray[1]== "1" || inputArray[1]== "01"):
      month = "01"
      break
    case (inputArray[1]== "February" || inputArray[1]== "Feb" || inputArray[1]== "2" || inputArray[1]== "02"):
      month = "02"
      break
    case (inputArray[1]== "March" || inputArray[1]== "Mar" || inputArray[1]== "3" || inputArray[1]== "03"):
      month = "03"
      break
    case (inputArray[1]== "April" || inputArray[1]== "Apr" || inputArray[1]== "4" || inputArray[1]== "04"):
      month = "04"
      break
    case (inputArray[1]== "May" || inputArray[1]== "5" || inputArray[1]== "05"):
      month = "05"
      break
    case (inputArray[1]== "June" || inputArray[1]== "Jun" || inputArray[1]== "6" || inputArray[1]== "06"):
      month = "06"
      break
    case (inputArray[1]== "July" || inputArray[1]== "Jul" || inputArray[1]== "7" || inputArray[1]== "07"):
      month = "07"
      break
    case (inputArray[1]== "August" || inputArray[1]== "Aug" || inputArray[1]== "8" || inputArray[1]== "08"):
      month = "08"
      break
    case (inputArray[1]== "September" || inputArray[1]== "Sep" || inputArray[1]== "9" || inputArray[1]== "09"):
      month = "09"
      break
    case (inputArray[1]== "October" || inputArray[1]== "Oct" || inputArray[1]== "10"):
      month = "10"
      break
    case (inputArray[1]== "November" || inputArray[1]== "Nov" || inputArray[1]== "11"):
      month = "11"
      break
    case (inputArray[1]== "December" || inputArray[1]== "Dec" || inputArray[1]== "12"):
      month = "12"
      break
    default:
      return undefined
    }
      
  switch(true){
    case (inputArray[2].length == 2):
      year = "20" + inputArray[2]
      break
    case (inputArray[2].length == 4):
      year = inputArray[2]
      break
    default:
        return undefined
  }
  
  res = year + "-" + month + "-" + day
  return res
}

const getResults = async (req, res) => {
  const { search } = req.query;

  let filter;

  if (search != undefined) {
    filter = validateSearchInput(search);
  }


  let filteredResults = [];
  const resultQuery = await db.promise().query("SELECT * FROM hasil");
  const results = resultQuery[0];
  if (!filter) {
    filteredResults = results;
  } else {
    let currTanggal
    let currDisease
    if(filter.get('tanggal')){
      currTanggal = sqlDateFormat(filter.get('tanggal'))
    }
    if(filter.get('nama_penyakit')){
      currDisease = filter.get('nama_penyakit')
    }
    if (currTanggal != undefined){
      if(currDisease != undefined){
        filteredResults = results.filter((result) =>
        result.tanggal.toLowerCase() === currTanggal &&
        result.disease_name.toLowerCase() === currDisease.toLowerCase()
        )
      }else{
        filteredResults = results.filter((result) =>
        result.tanggal === currTanggal
        )
      }
    }else{
      if(currDisease != undefined){
        filteredResults = results.filter((result) =>
        result.disease_name.toLowerCase() === currDisease.toLowerCase()
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