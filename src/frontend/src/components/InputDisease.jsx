import "./InputDisease.scss";
import { motion, AnimatePresence } from 'framer-motion'
import { createRef, useState, useEffect } from "react";
import NotifMessage from "./NotifMessage";
import axios from "axios";
import { AiOutlineCloseCircle } from 'react-icons/ai';

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 }
}

const modal = {
  hidden: { opacity: 0, y: "-100vh" },
  visible: { opacity: 1, y: 0, transition: { delay: 0.5 } },
}

const InputDisease = ({ showModal, setShowModal }) => {

  const [diseases, setDiseases] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/disease").then((res) => {
      setDiseases(res.data);
    })
  }, []);

  const [fileName, setFileName] = useState('')
  const [diseaseExist, setDiseaseExist] = useState(false);
  const [invalidInput, setInvalidInput] = useState(false);
  const [messageNotif, setMessageNotif] = useState(false);
  const [data, setData] = useState({
    name: '',
    dna_sequence: ''
  });
  let result = '';

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
      setData({
        ...data,
        dna_sequence: text
      })
    }
    reader.readAsText(file.current.files[0])
    setFileName(e.target.files[0].name)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDiseaseExist(false);

    if (diseases.some((disease) => disease.nama_penyakit.toUpperCase() === data.name.toUpperCase())) {
      setDiseaseExist(true);
    } else {
      await axios.post("https://dna-pattern-matching-tubes3.herokuapp.com/api/disease", data).then((res) => {
        result = res.data.message;
      })
      if (result === "Success") {
        setMessageNotif(true);
        setTimeout(() => {
          window.location.reload()
        }, 2000);
      } else {
        setInvalidInput(true);
      }
    }
  }

  const iconStyle = {
    fontSize: "1.7em",
    color: "#336CFB",
    cursor: "pointer"
  }

  return (
    <AnimatePresence exitBeforeEnter>
      {showModal && (
        <motion.div className="InputDisease_backdrop"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div className="InputDisease"
            variants={modal}
          > 
            <div className="top-bar">
              <h5>Input New Disease</h5>
              <AiOutlineCloseCircle style={iconStyle} onClick={() => setShowModal(false)} />
            </div>

            <form onSubmit={handleSubmit} >
              <label>Disease Name</label>
              <input type="text" name="name" value={data.name} onChange={handleChange} />

              <div class="file-input-wrapper">
              <label class="file-upload">
                DNA Sequence
                <input type="file" ref={file} onChange={handleFileChange} />
              </label>
              <div class="file-name">
                {fileName !== '' ? fileName : "No File Chosen"}
              </div>
              </div>
              <button className={data.dna_sequence === '' || data.name === '' || invalidInput ? 'disabled' : ''} >Submit</button>

              {messageNotif && (
                <NotifMessage message="New disease submitted successfully, page will reload automatically" bcolor="green" />
              )}

              {invalidInput && (
                <NotifMessage message="DNA Sequence invalid, please input a correct DNA Sequence (consists of A, C, G, T)" bcolor="red" />
              )}
              
              {diseaseExist && (
                <NotifMessage message="Disease already exist, please input a new disease" bcolor="red" />
              )}

            </form>

          </motion.div>
        </motion.div>
      )}

    </AnimatePresence>

  )
}

export default InputDisease