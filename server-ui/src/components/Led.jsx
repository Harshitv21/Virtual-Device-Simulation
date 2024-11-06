import "../styles/Led.css";

function Led({ LEDColor, handleLEDChange }) {
  const handleReset = () => {
    handleLEDChange("#a3ffaf");
  };

  const generateRandomHexColor = () => {
    // Generate a random number and convert it to a hex string
    let hex = Math.floor(Math.random() * 16777215).toString(16);

    // Pad the hex string with leading zeros if it's shorter than 6 characters
    while (hex.length < 6) {
      hex = "0" + hex;
    }

    // Return the color in the "#rrggbb" format
    return "#" + hex;
  };

  const handleRandomize = () => {
    const randomColor = generateRandomHexColor();
    handleLEDChange(randomColor);
  };

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
        >
          <label
            htmlFor="LEDColorInput"
            className="form-label"
            style={{ marginRight: "10px" }}
          >
            <span style={{ fontStyle: "italic", fontWeight: "bold" }}>
              Change color of LED:
            </span>
          </label>
          <input
            type="color"
            className="form-control form-control-color"
            id="LEDColorInput"
            defaultValue={LEDColor}
            title="Choose your color"
            onChange={(e) => handleLEDChange(e.target.value)}
          />
        </div>
        <div className="btnGroup">
          <div>
            <button className="button" onClick={handleReset}>
              Reset
            </button>
          </div>
          <div>
            <button className="button" onClick={handleRandomize}>
              Randomize
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Led;
