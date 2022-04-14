import "./DiseaseInfo.scss"

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
    <div className='DiseaseInfo'>
      <h5>List of Diseases</h5>
      <div className="disease-list">
        {diseases.map((disease) => {
          return (
            <div className="disease-info">{disease.name}</div>
          )
        })}
      </div>
    </div>
  )
}

export default DiseaseInfo