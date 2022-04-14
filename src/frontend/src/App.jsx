import "./App.scss";
import InputForm from "./components/InputForm";
import DiseaseInfo from "./components/DiseaseInfo";
import PredictionTable from "./components/PredictionTable";
import TopBar from "./components/TopBar";

const App = () => {
  return (
    <div className="App">
      <TopBar />
      <div className="info-wrapper">
        <InputForm />
        <DiseaseInfo />
      </div>
      <PredictionTable />
    </div>
  )
}

export default App;
