import "../styles/AirConditioner.css";

function AirConditioner({currentTemperature, turnOnAC}) {
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
      </div>
    </div>
  );
}

export default AirConditioner;