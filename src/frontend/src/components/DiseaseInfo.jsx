import "./DiseaseInfo.scss"
import { motion } from 'framer-motion';
import axios from 'axios'
import { useState, useEffect } from "react";
import InputDisease from "./InputDisease";

const DiseaseInfo = () => {

  const [diseases, setDiseases] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get("https://dna-pattern-matching-tubes3.herokuapp.com/api/disease").then((res) => {
      setDiseases(res.data);
    })
  }, []);

  return (
    <>
      <motion.div className='DiseaseInfo'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="top-bar">
          <h5>List of Diseases</h5>
          <button onClick={() => setShowModal(true)} >Add Disease</button>
        </div>
        <div className="disease-list">
          {diseases.map((disease) => {
            return (
              <div className="disease-info">{disease.nama_penyakit}</div>
            )
          })}
        </div>
      </motion.div>
      <InputDisease showModal={showModal} setShowModal={setShowModal} />
    </>
  )
}

export default DiseaseInfo