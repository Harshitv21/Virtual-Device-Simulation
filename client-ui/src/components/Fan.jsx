import FanIcon from "../assets/fanIcon.svg";
import "../styles/Fan.css";

function Fan({ currentSpeed }) {
  return (
    <div className="individualComponents">
      <div className="headingOfComponent">
        <h1>Fan 🪭</h1>
      </div>
      <div className="fanIconContainer">
        <img
          className={`fanIcon fanBlades speed-${currentSpeed}`}
          src={FanIcon}
          alt="Supposed to be a fan image"
        />
      </div>
      <div>
        <label htmlFor="fanSpeedRange" className="form-label">
          <span style={{ fontStyle: "italic", fontWeight: "bold" }}>
            Current Fan Speed:
          </span>
          <span> {currentSpeed} </span>
        </label>
      </div>
    </div>
  );
}

export default Fan;
