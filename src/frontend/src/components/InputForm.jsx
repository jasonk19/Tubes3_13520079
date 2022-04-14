import { useState, createRef } from 'react';
import './InputForm.scss';

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

  const today = new Date();
  const date = today.getDate() + ' ' + convertMonth(today.getMonth() + 1) + ' ' + today.getFullYear();

  const [data, setData] = useState({
    date: date,
    patient: '',
    dna_sequence: '',
    disease: '',
  })

  const [fileName, setFileName] = useState('')

  const file = createRef();

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value
    })
  }

  const handleFileChange = (e) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target.result;
      setData({
        ...data,
        dna_sequence: text
      })
    }
    reader.readAsText(file.current.files[0])
    setFileName(e.target.files[0].name)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(data)
  }


  return (
    <div className="InputForm">
      <h5>Input Test</h5>
      <form onSubmit={handleSubmit}>
        <label>Patient Name</label>
        <input type="text" name="patient" value={data.patient} onChange={handleChange} />
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


        <button>Submit</button>
      </form>
    </div>
  )
}

export default InputForm;