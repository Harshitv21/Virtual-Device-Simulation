import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import Fan from "./components/Fan";
import "./styles/App.css";
import axios from "axios";

function App() {
  const [currentSpeed, setCurrentSpeed] = useState(0);

  useEffect(() => {
    const sendClientData = async (newSpeed) => {
      await axios.post("http://localhost:5001/api/fan", { newSpeed });
    };
    sendClientData(currentSpeed);
  }, [currentSpeed]);

  const handleSpeedChange = (newSpeed) => {
    setCurrentSpeed(newSpeed);
  };

  return (
    <div className="pageComponent">
      <Header />
      <div className="individualComponent">
        <Fan
          currentSpeed={currentSpeed}
          handleSpeedChange={handleSpeedChange}
        />
      </div>
    </div>
  );
}

export default App;
