import "../styles/Led.css";

function Led({ LEDColor }) {
  return (
    <>
      <div
        className="individualComponents"
        style={{ backgroundColor: `${LEDColor}` }}
      >
        <div>
          <h1>LED ⚡</h1>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        ></div>
      </div>
    </>
  );
}

export default Led;
