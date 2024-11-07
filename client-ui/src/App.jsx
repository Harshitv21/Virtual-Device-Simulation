import { useState, useEffect } from "react";
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
  const socket = io(
    `${import.meta.env.VITE_DEPLOYED_URL || "http://localhost:5069"}`
  );

  /* states */
  /* Fan state */
  const [currentSpeed, setCurrentSpeed] = useState(0);
  /* LED state */
  const [LEDColor, changeLEDColor] = useState("#a3ffaf");
  /* Bulb state */
  const [isOn, setIsOn] = useState(true);
  /* AC On / Off state */
  const [turnOnAC, setTurnOnAC] = useState(false);
  /* AC temperature state */
  const [currentTemperature, setCurrentTemperature] = useState(16);

  useEffect(() => {
    async function fetchInitialState() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_EMPTY_URL || "http://localhost:5069"}/devices`
        );
        const data = await response.json();
        setCurrentSpeed(data.fanSpeed);
        changeLEDColor(data.ledColor);
        setIsOn(data.bulbIsOn);
        setTurnOnAC(data.acOn);
        setCurrentTemperature(data.acTemperature);
      } catch (error) {
        console.error("Failed to fetch initial state:", error);
      }
    }
    fetchInitialState();
  }, []);

  const handleSpeedChange = (newSpeed) => {
    setCurrentSpeed(newSpeed);
  };

  // receiving fan speed
  socket.on("Fan", (newSpeed) => {
    socket.emit("Response", "Changed Fan Speed...");
    handleSpeedChange(newSpeed);
  });

  const handleLEDChange = (newColor) => {
    changeLEDColor(newColor);
  };

  // receiving new LED color
  socket.on("Led", (newColor) => {
    socket.emit("Response", "Changed LED Color...");
    handleLEDChange(newColor);
  });

  /* Bulb state */
  const toggleBulb = () => {
    setIsOn(!isOn);
  };

  // toggling bulb on / off
  socket.on("Bulb", (isOn) => {
    toggleBulb();
    socket.emit("Response", `Bulb is now ${isOn ? "On" : "Off"}`);
  });

  /* AC state */
  socket.on("AcToggle", (acOn) => {
    setTurnOnAC(!acOn);
    socket.emit("Response", "Toggled AC...");
  });

  // received current changed temperature
  socket.on("AcTemp", (currentTemperature) => {
    socket.emit("Response", "Changed AC Speed...");
    setCurrentTemperature(currentTemperature);
  });

  useEffect(() => {
    const pollDeviceStates = setInterval(async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_EMPTY_URL || "http://localhost:5069"}/devices`
        );
        const data = await response.json();

        // Update states based on the response
        setCurrentSpeed(data.fanSpeed);
        changeLEDColor(data.ledColor);
        setIsOn(data.bulbIsOn);
        setCurrentTemperature(data.acTemperature);
        setTurnOnAC(data.acOn);
      } catch (error) {
        console.error("Error fetching device states:", error);
      }
    }, 3000); // Poll every 3 seconds

    // Cleanup the interval when the component unmounts
    return () => clearInterval(pollDeviceStates);
  }, []);

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
