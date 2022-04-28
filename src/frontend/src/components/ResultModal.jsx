import "./ResultModal.scss";
import { motion, AnimatePresence } from 'framer-motion'

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 }
}

const modal = {
  hidden: { opacity: 0, y: "-100vh" },
  visible: { opacity: 1, y: 0, transition: { delay: 0.5 } },
}

const ResultModal = ({ showModal, patientData, date }) => {
  return (
    <AnimatePresence exitBeforeEnter>
      {showModal && (
        <motion.div className="ResultModal_backdrop"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div className="ResultModal"
            variants={modal}
          >
            <h5>Result Summary</h5>
            <div className="Summary">
              <div className="category">
                <p>Date</p>
                <p>Patient Name</p>
                <p>Disease Checkup</p>
                <p>DNA Similarity</p>
                <p>Result</p>
              </div>
              <div className="content">
                <p>{date}</p>
                <p>{patientData.name}</p>
                <p>{patientData.disease}</p>
                <p>{patientData.similarity}%</p>
                <p>{patientData.status}</p>
              </div>
            </div>
            <div className={patientData.status === "True" ? "status-true" : "status-false"}>
              {patientData.status === "True" ? "Need Medication" : "Disease Free"}
            </div>
            <p className="close-notif">* page will refresh in 7 seconds</p>
          </motion.div>
        </motion.div>
      )}

    </AnimatePresence>

  )
}

export default ResultModal