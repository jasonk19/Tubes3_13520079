import { useState, createRef, useEffect } from 'react';
import './InputForm.scss';
import { motion } from 'framer-motion';
import ResultModal from './ResultModal';
import NotifMessage from './NotifMessage';
import axios from 'axios';

const InputForm = () => {
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

  const [diseases, setDiseases] = useState([]);

  useEffect(() => {
    axios.get("https://dna-pattern-matching-tubes3.herokuapp.com/api/disease").then((res) => {
      setDiseases(res.data);
    })
  }, [])

  const today = new Date();
  const date = today.getDate() + ' ' + convertMonth(today.getMonth() + 1) + ' ' + today.getFullYear();
  const dataDate = today.toISOString().split('T')[0];
  
  const [data, setData] = useState({
    date: dataDate,
    name: '',
    patient_dna_sequence: '',
    disease: '',
    disease_dna_sequence: '',
  })
  const [showModal, setShowModal] = useState(false);
  const [fileName, setFileName] = useState('')
  const [invalidInput, setInvalidInput] = useState(false);
  const [result, setResult] = useState({});
  const [unknownDisease, setUnknownDisease] = useState(false);

  let message = '';

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
      patient_dna_sequence: ''
    })
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target.result;
      setData({
        ...data,
        patient_dna_sequence: text
      })
    }
    reader.readAsText(file.current.files[0])
    setFileName(e.target.files[0].name)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUnknownDisease(false);
    let diseaseDNA;
    for (let i = 0; i < diseases.length; i++) {
      if (diseases[i].nama_penyakit.toUpperCase() === data.disease.toUpperCase()) {
        diseaseDNA = diseases[i].seq_dna;
      }
    }

    if (diseaseDNA === undefined || diseaseDNA === '') {
      setUnknownDisease(true);
    } else {
      data.disease_dna_sequence = diseaseDNA;
      
      await axios.post("https://dna-pattern-matching-tubes3.herokuapp.com/api/result", data).then((res) => {
        setResult(res.data.data);
        message = res.data.message;
      })
  
      if (message === "Success") {
        setShowModal(true);
    
        setTimeout(() => window.location.reload(), 7000);
      } else {
        setInvalidInput(true);
      }
    }
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
          <button className={data.patient_dna_sequence === '' || data.name === '' || data.disease === '' || invalidInput ? 'disabled' : ''} >Submit</button>

          {invalidInput && (
            <NotifMessage message="DNA Sequence invalid, please input a correct DNA Sequence (consists of A, C, G, T)" bcolor="red" />
          )}

          {unknownDisease && (
            <NotifMessage message="Disease does not exist, please enter a valid disease name that is listed in List of Disease" bcolor="red" />
          )}
        </form>
      </motion.div>
      <ResultModal 
        showModal={showModal} 
        date={date}
        patientData={result}
      />
    </>
  )
}

export default InputForm;