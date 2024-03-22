import FanIcon from "../assets/fanIcon.svg";
import "../styles/Fan.css";

function Fan({ currentSpeed, handleSpeedChange }) {

  return (
    <div className="fanComponent">
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
        <input
          type="range"
          className="form-range"
          defaultValue={0}
          min="0"
          max="5"
          step="1"
          id="fanSpeedRange"
          onChange={(e) => handleSpeedChange(e.target.value)}
        ></input>
      </div>
    </div>
  );
}

export default Fan;
