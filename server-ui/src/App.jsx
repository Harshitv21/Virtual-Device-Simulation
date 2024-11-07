import { useState, useEffect } from "react";
import axios from "axios";
import "./styles/App.css";
import AirConditioner from "./components/AirConditioner";
import Bulb from "./components/Bulb";
import Fan from "./components/Fan";
import Header from "./components/Header";
import Led from "./components/Led";
import Status from "./components/Status";

const baseUrl = import.meta.env.VITE_EMPTY_URL || "http://localhost:5069";

function App() {
  /* Fan state */
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const handleSpeedChange = (newSpeed) => {
    setCurrentSpeed(newSpeed);
  };

  // sending fan speed to backend
  useEffect(() => {
    const sendClientData = async (newSpeed) => {
      await axios.post(`${baseUrl}/fan`, { newSpeed });
    };
    sendClientData(currentSpeed);
  }, [currentSpeed]);

  /* LED state */
  const [LEDColor, changeLEDColor] = useState("#a3ffaf");
  const handleLEDChange = (newColor) => {
    changeLEDColor(newColor);
  };

  // sending newly generated color
  useEffect(() => {
    const sendClientData = async (newColor) => {
      await axios.post(`${baseUrl}/led`, { newColor });
    };
    sendClientData(LEDColor);
  }, [LEDColor]);

  /* Bulb state */
  const [isOn, setIsOn] = useState(true);

  const toggleBulb = () => {
    setIsOn((prev) => !prev);
  };

  // not sending anything just toggling bulb on / off
  useEffect(() => {
    const sendClientData = async () => {
      await axios.post(`${baseUrl}/bulb`, { isOn });
    };
    sendClientData();
  }, [isOn]);

  /* AC state */
  const [turnOnAC, setTurnOnAC] = useState(false);
  const [currentTemperature, setCurrentTemperature] = useState(16);

  // toggling ac on / off
  const toggleACOnOrOff = async () => {
    setTurnOnAC((prev) => !prev);
  };

  // setting ac temperature
  const changeACTemperature = (newTemp) => {
    setCurrentTemperature(newTemp);
  };

  // again for ac also not sending anything when just turning ac on or off
  useEffect(() => {
    const sendClientData = async () => {
      await axios.post(`${baseUrl}/acToggle`, { turnOnAC });
    };
    sendClientData();
  }, [turnOnAC]);

  // sending current changed temperature
  useEffect(() => {
    const sendClientData = async (currentTemperature) => {
      await axios.post(`${baseUrl}/acTemp`, {
        currentTemperature,
      });
    };
    sendClientData(currentTemperature);
  }, [currentTemperature]);

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
