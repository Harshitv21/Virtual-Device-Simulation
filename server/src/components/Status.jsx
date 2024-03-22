import "../styles/Status.css";

function Status({
  currentSpeed,
  LEDColor,
  isOn,
  currentTemperature,
  turnOnAC,
}) {
  return (
    <div className="statusComponent">
      <div>
        <h1>All Device Status</h1>
      </div>
      <div>
        <h4>Fan</h4>
        <p>Current Speed: {currentSpeed}</p>
        <h4>LED</h4>
        <p>
          Current Color:{" "}
          <span
            style={{
              backgroundColor: `${LEDColor}`,
              padding: "3px",
              border: "2px solid black",
              borderRadius: "6px",
            }}
          >
            {LEDColor}
          </span>
        </p>
        <h4>Bulb</h4>
        <p>On / Off: {isOn ? "On" : "Off"}</p>
        <h4>Air Conditioner</h4>
        <p>On / Off:{" "}{turnOnAC ? "AC is Working" : "AC is Turned OFF"}</p>
        <p>Temperature:{" "}{turnOnAC ? currentTemperature : "AC is Turned OFF"}</p>
      </div>
    </div>
  );
}

export default Status;
