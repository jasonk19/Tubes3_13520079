import "./TopBar.scss";
import logo from "../assets/icon/icon.svg";

const TopBar = () => {
  return (
    <div className="TopBar">
      <div className="Logo">
        <img src={logo} alt="logo"></img>
        <h4>DNA Tester</h4>
      </div>
      <div className="Author">
        <p>By: hostingbutuhDaNA</p>
      </div>
    </div>
  )
}

export default TopBar