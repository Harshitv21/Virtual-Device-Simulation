import { useState } from "react";
import { io } from "socket.io-client";
import { Header } from "./components/Header";
import Fan from "./components/Fan";
import "./styles/App.css";

function App() {
  const [currentSpeed, setCurrentSpeed] = useState(0);

  // socket logic
  const socket = io("http://localhost:5003");
  socket.on("Speed", (newSpeed) => {
    // console.log(newSpeed);
    socket.emit("Response", "Recieved Fan Speed...");
    setCurrentSpeed(newSpeed);
  });

  return (
    <div className="pageComponent">
      <Header />
      <div className="individualComponent">
        <Fan currentSpeed={currentSpeed} />
      </div>
    </div>
  );
}

export default App;
