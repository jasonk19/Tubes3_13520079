import "./DiseaseInfo.scss"
import { motion } from 'framer-motion';

const DiseaseInfo = () => {

  const diseases = [
    {
      name: "HIV",
      dna_sequence: "ACGT",
    },
    {
      name: "Malaria",
      dna_sequence: "ACGT",
    },
    {
      name: "Corona",
      dna_sequence: "ACGT",
    },
    {
      name: "Batuk",
      dna_sequence: "ACGT",
    },
    {
      name: "Pilek",
      dna_sequence: "ACGT",
    },
    {
      name: "Migraine",
      dna_sequence: "ACGT",
    },
    {
      name: "Migraine",
      dna_sequence: "ACGT",
    },
    {
      name: "Migraine",
      dna_sequence: "ACGT",
    },
    {
      name: "Migraine",
      dna_sequence: "ACGT",
    },
    {
      name: "Migraine",
      dna_sequence: "ACGT",
    },
    {
      name: "Migraine",
      dna_sequence: "ACGT",
    },
    {
      name: "Migraine",
      dna_sequence: "ACGT",
    },
    {
      name: "Migraine",
      dna_sequence: "ACGT",
    },
    {
      name: "Migraine",
      dna_sequence: "ACGT",
    },
    {
      name: "Migraine",
      dna_sequence: "ACGT",
    },
    {
      name: "Migraine",
      dna_sequence: "ACGT",
    },
    {
      name: "Migraine",
      dna_sequence: "ACGT",
    },
    {
      name: "Migraine",
      dna_sequence: "ACGT",
    },
    {
      name: "Migraine",
      dna_sequence: "ACGT",
    },
    {
      name: "Migraine",
      dna_sequence: "ACGT",
    },
    {
      name: "Migraine",
      dna_sequence: "ACGT",
    },
    {
      name: "Migraine",
      dna_sequence: "ACGT",
    },
    {
      name: "Migraine",
      dna_sequence: "ACGT",
    },
    {
      name: "Migraine",
      dna_sequence: "ACGT",
    },
    {
      name: "Migraine",
      dna_sequence: "ACGT",
    },
  ]

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