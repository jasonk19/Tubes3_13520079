import "./PredictionTable.scss";
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'

const PredictionTable = () => {
  const [patients, setPatients] = useState([])

  useEffect(() => {
    axios.get("http://localhost:5000/api/result").then((res) => {
      setPatients(res.data)
    })
  }, [])

  const handleSearch = async (e) => {
    let search = e.target.value;
    
    if (search !== '') {
      await axios.get(`http://localhost:5000/api/result?search=${search}`).then((res) => {
        setPatients(res.data)
      })
    } else {
      await axios.get("http://localhost:5000/api/result").then((res) => {
        setPatients(res.data)
      })
    }
  }

  return (
    <motion.div className='PredictionTable'
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 1 }}
    >
      <h5>Patients Result</h5>
      <div className="top-table">
        <div className="legend">
          <div className="legend-wrap">
            <div class="need-medication"></div>
            <p>Need Medication</p>
          </div>
          <div className="legend-wrap">
            <div class="safe"></div>
            <p>Disease Free</p>
          </div>
        </div>
        <div>
          <input className="search" type="search" placeholder="Search" onChange={handleSearch} />
        </div>
      </div>
      <table>
        <tr>
          <th className="row-number">No</th>
          <th>Prediction Date</th>
          <th>Patient Name</th>
          <th>Disease Prediction</th>
          <th>Similarity Rate</th>
          <th>Prediction Status</th>
        </tr>
        {patients.map((patient, index) => {
          return (
            <tr>
              <td className="row-number">{index + 1}</td>
              <td>{patient.date}</td>
              <td>{patient.name}</td>
              <td>{patient.disease_name}</td>
              <td>{patient.similarity}%</td>
              <td className={patient.status === "True" ? "true" : "false"}>{patient.status}</td>
            </tr>
          )
        })}
      </table>
    </motion.div>
  )
}

export default PredictionTable