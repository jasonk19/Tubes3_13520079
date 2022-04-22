import "./DiseaseInfo.scss"
import { motion } from 'framer-motion';
import axios from 'axios'
import { useState, useEffect } from "react";

const DiseaseInfo = () => {

  const [diseases, setDiseases] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/disease").then((res) => {
      setDiseases(res.data);
    })
  }, []);

  return (
    <motion.div className='DiseaseInfo'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <h5>List of Diseases</h5>
      <div className="disease-list">
        {diseases.map((disease) => {
          return (
            <div className="disease-info">{disease.name}</div>
          )
        })}
      </div>
    </motion.div>
  )
}

export default DiseaseInfo