import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import Fan from "./components/Fan";
import "./styles/App.css";
// import { io } from "socket.io-client";

function App() {
  const [currentSpeed, setCurrentSpeed] = useState(0);

  // socket logic

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
