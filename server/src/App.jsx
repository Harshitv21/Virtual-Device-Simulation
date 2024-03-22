import { useState } from "react";
import "./styles/App.css";
import AirConditioner from "./components/AirConditioner";
import Bulb from "./components/Bulb";
import Fan from "./components/Fan";
import Header from "./components/Header";
import Led from "./components/Led";
import Status from "./components/Status";
// import axios from "axios";

function App() {
  // Fan state
  const [currentSpeed, setCurrentSpeed] = useState(0);

  const handleSpeedChange = (newSpeed) => {
    setCurrentSpeed(newSpeed);
  };

  // LED state
  const [LEDColor, changeLEDColor] = useState("#a3ffaf");

  const handleLEDChange = (newColor) => {
    changeLEDColor(newColor);
  };

  // Bulb state
  const [isOn, setIsOn] = useState(true);
  const toggleBulb = () => {
    setIsOn(!isOn);
  };

  // AC state
  const [currentTemperature, setCurrentTemperature] = useState(16);
  const [turnOnAC, setTurnOnAC] = useState(false);

  const changeACTemperature = (newTemp) => {
    setCurrentTemperature(newTemp);
  };

  const toggleACOnOrOff = () => {
    setTurnOnAC(!turnOnAC);
  };

  return (
    <>
      <div className="pageContainer">
        <div>
          <Header />
        </div>
        <div className="components">
          <Fan
            currentSpeed={currentSpeed}
            handleSpeedChange={handleSpeedChange}
          />
          <Led LEDColor={LEDColor} handleLEDChange={handleLEDChange} />
          <Bulb isOn={isOn} toggleBulb={toggleBulb} />
          <AirConditioner
            currentTemperature={currentTemperature}
            turnOnAC={turnOnAC}
            changeACTemperature={changeACTemperature}
            toggleACOnOrOff={toggleACOnOrOff}
          />
        </div>
        <div className="statusComponentContainer">
          <Status
            currentSpeed={currentSpeed}
            LEDColor={LEDColor}
            isOn={isOn}
            currentTemperature={currentTemperature}
            turnOnAC={turnOnAC}
          />
        </div>
      </div>
    </>
  );
}

export default App;
