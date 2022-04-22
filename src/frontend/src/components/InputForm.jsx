import { useState, createRef, useEffect } from 'react';
import './InputForm.scss';
import { motion } from 'framer-motion';
import ResultModal from './ResultModal';
import InvalidInput from './InvalidInput';
import { isValid, hammingDistance, kmpMatching, bmMatch } from '../stringmatch';
import axios from 'axios';

const InputForm = () => {
  const [diseases, setDiseases] = useState([]);

  const convertMonth = (month) => {
    switch (month) {
      case 1:
        return "January"
      case 2:
        return "February"
      case 3:
        return "March"
      case 4:
        return "April"
      case 5:
        return "May"
      case 6:
        return "June"
      case 7:
        return "July"
      case 8:
        return "August"
      case 9:
        return "September"
      case 10:
        return "October"
      case 11:
        return "November"
      case 12:
        return "December"
      default:
        break;
    }
  }

  useEffect(() => {
    axios.get("http://localhost:5000/api/disease").then((res) => {
      setDiseases(res.data);
    })
  }, [])

  const today = new Date();
  const date = today.getDate() + ' ' + convertMonth(today.getMonth() + 1) + ' ' + today.getFullYear();
  
  const [data, setData] = useState({
    date: date,
    name: '',
    dna_sequence: '',
    disease: '',
    similarity: '',
    status: ''
  })

  const [showModal, setShowModal] = useState(false);

  const [fileName, setFileName] = useState('')

  const [invalidInput, setInvalidInput] = useState(false);

  const [similarityRate, setSimilarityRate] = useState(100);

  const file = createRef();

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value
    })
  }

  const handleFileChange = (e) => {
    setInvalidInput(false)
    setData({
      ...data,
      dna_sequence: ''
    })
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target.result;
      if (!isValid(text)) {
        setInvalidInput(true);
      } else {
        setData({
          ...data,
          dna_sequence: text
        })
      }
    }
    reader.readAsText(file.current.files[0])
    setFileName(e.target.files[0].name)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    let diseaseDNA = '';
    let status;

    for (let i = 0; i < diseases.length; i++) {
      if (diseases[i].name.toUpperCase() === data.disease.toUpperCase()) {
        diseaseDNA = diseases[i].dna_sequence;
      }
    }

    const position = kmpMatching(data.dna_sequence, diseaseDNA);

    const similarity = hammingDistance(data.dna_sequence, diseaseDNA, position);

    if (similarity >= 80) {
      status = "True";
    } else {
      status = "False";
    }

    data.similarity = similarity;
    data.status = status;

    console.log(data)

    setShowModal(true)

    setTimeout(() => window.location.reload(), 7000)
  }

  return (
    <>
      <motion.div className="InputForm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h5>Input Test</h5>
        <form onSubmit={handleSubmit}>
          <label>Patient Name</label>
          <input type="text" name="name" value={data.name} onChange={handleChange} />
          <label>Disease Name</label>
          <input type="text" name="disease" value={data.disease} onChange={handleChange} />

          <div class="file-input-wrapper">
            <label class="file-upload">
              DNA Sequence
              <input type="file" ref={file} onChange={handleFileChange} />
            </label>
            <div class="file-name">
              {fileName !== '' ? fileName : "No File Chosen"}
            </div>
          </div>
          {invalidInput && (
              <InvalidInput message="DNA Sequence invalid, please input a correct DNA Sequence (consists of A, C, G, T)" />
          )}
          <button className={data.dna_sequence === '' || invalidInput ? 'disabled' : ''} >Submit</button>
        </form>
      </motion.div>
      <ResultModal 
        showModal={showModal} 
        patientData={data}
      />
    </>
  )
}

export default InputForm;