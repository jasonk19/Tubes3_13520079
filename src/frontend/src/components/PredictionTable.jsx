import "./PredictionTable.scss";
import { useState } from 'react'

const PredictionTable = () => {
  const [patients, setPatients] = useState([
    {
      id: 1,
      date: "14 April 2022",
      name: "Lorem Ipsum",
      disease: "Migraine",
      status: "True",
    },
    {
      id: 2,
      date: "13 April 2022",
      name: "Lorem Ipsum",
      disease: "Migraine",
      status: "True",
    },
    {
      id: 3,
      date: "12 April 2022",
      name: "Lorem Ipsum",
      disease: "Migraine",
      status: "True",
    },
    {
      id: 4,
      date: "11 April 2022",
      name: "Lorem Ipsum",
      disease: "Migraine",
      status: "True",
    },
    {
      id: 5,
      date: "10 April 2022",
      name: "Bob Ipsum",
      disease: "Migraine",
      status: "False",
    },
    {
      id: 6,
      date: "15 April 2022",
      name: "Lorem Ipsum",
      disease: "Migraine",
      status: "False",
    },
    {
      id: 7,
      date: "15 April 2022",
      name: "Lorem Ipsum",
      disease: "Pusing",
      status: "False",
    },
    {
      id: 8,
      date: "15 April 2022",
      name: "Lorem Ipsum",
      disease: "Tidur",
      status: "False",
    },
  ])

  const initialPatients = [
    {
      id: 1,
      date: "14 April 2022",
      name: "Lorem Ipsum",
      disease: "Migraine",
      status: "True",
    },
    {
      id: 2,
      date: "13 April 2022",
      name: "Lorem Ipsum",
      disease: "Migraine",
      status: "True",
    },
    {
      id: 3,
      date: "12 April 2022",
      name: "Lorem Ipsum",
      disease: "Migraine",
      status: "True",
    },
    {
      id: 4,
      date: "11 April 2022",
      name: "Lorem Ipsum",
      disease: "Migraine",
      status: "True",
    },
    {
      id: 5,
      date: "10 April 2022",
      name: "Bob Ipsum",
      disease: "Migraine",
      status: "False",
    },
    {
      id: 6,
      date: "15 April 2022",
      name: "Lorem Ipsum",
      disease: "Migraine",
      status: "False",
    },
    {
      id: 7,
      date: "15 April 2022",
      name: "Lorem Ipsum",
      disease: "Pusing",
      status: "False",
    },
    {
      id: 8,
      date: "15 April 2022",
      name: "Lorem Ipsum",
      disease: "Tidur",
      status: "False",
    },
  ]

  const handleSearch = (e) => {
    let search = e.target.value;

    if (search !== '') {
      setPatients(patients.filter((patient) => 
        patient.date.toUpperCase().indexOf(search.toUpperCase()) !== -1 ||
        patient.name.toUpperCase().indexOf(search.toUpperCase()) !== -1 ||
        patient.disease.toUpperCase().indexOf(search.toUpperCase()) !== -1
      ));
    } else {
      setPatients(initialPatients);
    }

  }

  return (
    <div className='PredictionTable'>
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
          <th>Prediction Status</th>
        </tr>
        {patients.map((patient) => {
          return (
            <tr>
              <td className="row-number">{patient.id}</td>
              <td>{patient.date}</td>
              <td>{patient.name}</td>
              <td>{patient.disease}</td>
              <td className={patient.status === "True" ? "false" : "true"}>{patient.status}</td>
            </tr>
          )
        })}
      </table>
    </div>
  )
}

export default PredictionTable