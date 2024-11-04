import { useState } from "react";
import { io } from "socket.io-client";
import "./styles/App.css";
import AirConditioner from "./components/AirConditioner";
import Bulb from "./components/Bulb";
import Fan from "./components/Fan";
import Header from "./components/Header";
import Led from "./components/Led";
import Status from "./components/Status";

function App() {
  // socket logic
  const socket = io(`${import.meta.env.VITE_DEPLOYED_URL || "http://localhost:5069"}`);

  /* Fan state */
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const handleSpeedChange = (newSpeed) => {
    setCurrentSpeed(newSpeed);
  };

  // receiving fan speed
  socket.on("Fan", (newSpeed) => {
    // console.log(newSpeed);
    socket.emit("Response", "Changed Fan Speed...");
    handleSpeedChange(newSpeed);
  });

  /* LED state */
  const [LEDColor, changeLEDColor] = useState("#a3ffaf");
  const handleLEDChange = (newColor) => {
    changeLEDColor(newColor);
  };

  // receiving new LED color
  socket.on("Led", (newColor) => {
    socket.emit("Response", "Changed LED Color...");
    handleLEDChange(newColor);
  });

  /* Bulb state */
  const [isOn, setIsOn] = useState(true);
  const toggleBulb = () => {
    setIsOn(!isOn);
  };

  // toggling bulb on / off
  socket.on("Bulb", () => {
    socket.emit("Response", "Toggled Bulb...");
    toggleBulb();
  });

  /* AC state */
  const [currentTemperature, setCurrentTemperature] = useState(16);
  const [turnOnAC, setTurnOnAC] = useState(false);
  // toggling ac
  const toggleACOnOrOff = () => {
    setTurnOnAC(!turnOnAC);
  };
  // changing temperature
  const changeACTemperature = (newTemp) => {
    setCurrentTemperature(newTemp);
  };

  // not receiving anything just calling toggleACOnOrOff()
  socket.on("AcToggle", () => {
    socket.emit("Response", "Toggled AC...");
    toggleACOnOrOff();
  });

  // received current changed temperature
  socket.on("AcTemp", (currentTemperature) => {
    socket.emit("Response", "Changed AC Speed...");
    changeACTemperature(currentTemperature);
  });

  return (
    <>
      <div className="pageContainer">
        <div>
          <Header />
        </div>
        <div className="components">
          <Fan currentSpeed={currentSpeed} />
          <Led LEDColor={LEDColor} />
          <Bulb isOn={isOn} />
          <AirConditioner
            currentTemperature={currentTemperature}
            turnOnAC={turnOnAC}
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
