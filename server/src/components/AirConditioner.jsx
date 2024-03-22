import "../styles/AirConditioner.css";

function AirConditioner({currentTemperature, turnOnAC, changeACTemperature, toggleACOnOrOff}) {
  const temperatureType = ["Cool 🥶❄️", "Mild 😎☀️", "Warm 🥵🔥"];

  return (
    <div className="individualComponents">
      <div>
        <h1>Air Conditioner 🍃</h1>
      </div>

      <div className="ACIconContainer">
        <img
          width="66"
          height="66"
          src="https://img.icons8.com/external-smashingstocks-detailed-outline-smashing-stocks/66/external-ac-car-repair-smashingstocks-detailed-outline-smashing-stocks.png"
          alt="external-ac-car-repair-smashingstocks-detailed-outline-smashing-stocks"
        />
      </div>

      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="ACTurnOnOff"
          onChange={toggleACOnOrOff}
        />
        <label className="form-check-label" htmlFor="ACTurnOnOff">
          Off / On
        </label>
      </div>

      <div>
        <label htmlFor="ACTemperature" className="form-label">
          <span style={{ fontStyle: "italic", fontWeight: "bold" }}>
            Current AC Temperature:
          </span>
          {turnOnAC ? <span>
            {" "}
            {currentTemperature}{" - "}
            {currentTemperature >= 16 && currentTemperature < 20
              ? temperatureType[0]
              : currentTemperature >= 20 && currentTemperature <= 25
              ? temperatureType[1]
              : currentTemperature > 25 && currentTemperature <= 30
              ? temperatureType[2]
              : ""}{" "}
          </span> : <span>{" "}AC is Off 😴</span>}
        </label>
        <input
          type="range"
          className="form-range"
          defaultValue={currentTemperature}
          min="16"
          max="30"
          step="1"
          id="ACTemperature"
          disabled={turnOnAC ? false : true}
          onChange={(e) => changeACTemperature(e.target.value)}
        ></input>
      </div>
    </div>
  );
}

export default AirConditioner;
