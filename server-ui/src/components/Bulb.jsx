import { useState } from "react";
import "../styles/Bulb.css";

function Bulb({ isOn, toggleBulb }) {
  const [isClickDisabled, setIsClickDisabled] = useState(false);

  const onColor = "#fef6aa";
  const offColor = "#fff";

  const handleBulbClick = () => {
    if (isClickDisabled) return;

    // Disable click for 2 seconds
    setIsClickDisabled(true);

    toggleBulb();

    // Re-enable the bulb click after 2 seconds
    setTimeout(() => {
      setIsClickDisabled(false);
    }, 2000);
  };

  return (
    <div className="individualComponents">
      <div>
        <h1>Bulb 💡</h1>
      </div>
      <div className="bulbIconContainer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          width="100px"
          height="100px"
        >
          <path
            style={{
              fill: `${isOn ? onColor : offColor}`,
              userSelect: "none",
              cursor: isClickDisabled ? "not-allowed" : "pointer",
            }}
            // fill="#fef6aa"
            d="M59.888,70.332c2.031-1.277,2.875-4.239,2.422-5.765l-0.541-4.415c8.007-4.104,13.918-12.381,13.918-21.997c0-13.68-11.509-24.81-25.189-24.81s-24.769,11.09-24.769,24.769c0,9.616,5.491,17.933,13.498,22.037l-0.541,4.415c0,2.568,1.674,4.764,3.986,5.551"
            onClick={handleBulbClick}
          />
          <path
            fill="#1f212b"
            d="M59.889,71.332c-0.332,0-0.657-0.166-0.848-0.468c-0.294-0.468-0.153-1.085,0.314-1.379c1.621-1.019,2.328-3.513,1.996-4.634c-0.016-0.053-0.026-0.107-0.033-0.162l-0.542-4.415c-0.052-0.417,0.163-0.821,0.536-1.012c8.124-4.164,13.374-12.449,13.374-21.107c0-13.128-10.851-23.81-24.188-23.81c-13.106,0-23.77,10.663-23.77,23.769c0,8.949,4.964,17.053,12.954,21.147c0.373,0.191,0.588,0.596,0.536,1.012l-0.534,4.351c0.024,2.057,1.348,3.879,3.309,4.546c0.522,0.178,0.803,0.746,0.624,1.269c-0.177,0.523-0.74,0.804-1.269,0.625c-2.79-0.949-4.664-3.56-4.664-6.498c0-0.041,0.003-0.082,0.008-0.122l0.458-3.731c-8.297-4.535-13.422-13.13-13.422-22.599c0-14.209,11.561-25.769,25.77-25.769c14.44,0,26.188,11.578,26.188,25.81c0,9.178-5.41,17.958-13.842,22.559l0.449,3.656c0.546,2.04-0.547,5.346-2.874,6.809C60.255,71.283,60.07,71.332,59.889,71.332z"
          />
          <path
            fill="#1f212b"
            d="M47.542,67.739c-0.016,0-0.03,0-0.045-0.002c-0.275-0.024-0.479-0.267-0.454-0.542c0.522-5.9,0.102-10.628-1.361-14.719c-1.56,0.421-3.202,0.194-4.427-0.692c-1.09-0.789-1.752-1.862-1.817-2.946c-0.054-0.902,0.302-1.734,1.029-2.407c0.373-0.345,0.77-0.555,1.18-0.623c0.954-0.162,1.965,0.448,2.698,1.625c0.752,1.207,1.392,2.457,1.922,3.766c0.271-0.125,0.535-0.276,0.785-0.452c0.354-0.249,0.671-0.529,0.955-0.831c-0.001,0-0.001-0.001-0.002-0.002c-0.888-1.08-1.058-2.601-0.507-4.521c0.238-0.831,1.009-1.626,1.792-1.849c0.512-0.144,0.996-0.045,1.361,0.288c0.529,0.479,0.659,1.259,0.389,2.318c-0.28,1.094-0.777,2.453-1.655,3.664c0.794,0.514,1.959,0.735,3.316,0.623c1.114-0.094,2.149-0.604,2.949-1.444c-1.386-0.92-2.019-2.167-1.753-3.519c0.172-0.874,0.95-1.797,1.812-2.148c0.566-0.232,1.116-0.193,1.553,0.106c0.594,0.407,0.665,1.093,0.723,1.645c0.129,1.24-0.171,2.509-0.832,3.593c0.391,0.171,0.795,0.308,1.198,0.414c0.926-1.753,1.888-3.012,2.795-3.362c0.422-0.162,1.234-0.291,1.944,0.682c1.084,1.482,0.788,2.427,0.349,2.958c-0.796,0.963-2.685,1.176-4.541,0.854c-2.403,5.039-4.737,13.858-4.443,16.665c0.029,0.275-0.17,0.521-0.445,0.549c-0.265,0.031-0.521-0.17-0.549-0.445c-0.297-2.834,1.864-11.615,4.437-16.996c-0.473-0.133-0.929-0.3-1.35-0.497c-0.988,1.131-2.318,1.819-3.762,1.94c-1.633,0.14-3.048-0.167-4.038-0.844c-0.331,0.354-0.703,0.684-1.121,0.977c-0.319,0.225-0.655,0.416-1.001,0.573c1.513,4.227,1.95,9.091,1.414,15.145C48.015,67.543,47.798,67.739,47.542,67.739z M41.953,46.783c-0.047,0-0.095,0.004-0.143,0.012c-0.214,0.036-0.437,0.16-0.664,0.371c-0.508,0.469-0.747,1.012-0.711,1.613c0.047,0.784,0.56,1.583,1.405,2.195c0.938,0.68,2.238,0.859,3.479,0.556c-0.506-1.241-1.112-2.425-1.824-3.568C43.131,47.375,42.546,46.783,41.953,46.783z M59.365,49.286c1.513,0.207,2.854-0.019,3.303-0.562c0.387-0.467,0.004-1.199-0.385-1.731c-0.321-0.437-0.562-0.421-0.778-0.338C60.852,46.906,60.114,47.881,59.365,49.286z M49.734,44.48c-0.048,0-0.104,0.007-0.17,0.026c-0.456,0.13-0.962,0.662-1.105,1.163c-0.425,1.482-0.359,2.64,0.195,3.447c0.741-1.061,1.17-2.25,1.417-3.213c0.118-0.461,0.198-1.066-0.092-1.33C49.947,44.544,49.877,44.48,49.734,44.48z M56.423,44.175c-0.101,0-0.213,0.025-0.336,0.076c-0.548,0.224-1.102,0.872-1.209,1.416c-0.232,1.185,0.588,2.018,1.389,2.533c0.57-0.909,0.832-1.977,0.724-3.013c-0.05-0.477-0.097-0.795-0.294-0.931C56.618,44.202,56.526,44.175,56.423,44.175z"
          />
          <path
            fill="#8f9eb6"
            d="M57.228,76.614H43.592c-1.573,0-2.861-1.35-2.861-3v0c0-1.65,1.287-3,2.861-3h14.325c1.573,0,2.861,1.35,2.861,3v0c0,0.895,0,0.895-0.598,1.72"
          />
          <path
            fill="#1f212b"
            d="M57.228,77.614H43.592c-2.129,0-3.86-1.794-3.86-4s1.731-4,3.86-4h14.325c2.129,0,3.86,1.794,3.86,4c0,1.151-0.089,1.342-0.788,2.307c-0.324,0.447-0.949,0.547-1.396,0.224c-0.447-0.324-0.547-0.949-0.223-1.396c0.407-0.563,0.407-0.563,0.407-1.134c0-1.103-0.835-2-1.86-2H43.592c-1.025,0-1.86,0.897-1.86,2s0.835,2,1.86,2h13.637c0.553,0,1,0.448,1,1S57.781,77.614,57.228,77.614z"
          />
          <path
            fill="#8f9eb6"
            d="M57.682,82.614H44.775c-1.401,0-2.547-1.146-2.547-2.547v-0.907c0-1.401,1.146-2.547,2.547-2.547h12.907c1.401,0,2.547,1.146,2.547,2.547v0.907C60.228,81.468,59.082,82.614,57.682,82.614z"
          />
          <path
            fill="#1f212b"
            d="M57.681,83.614H44.775c-1.956,0-3.547-1.591-3.547-3.547v-0.906c0-1.956,1.591-3.547,3.547-3.547h12.906c1.956,0,3.547,1.591,3.547,3.547v0.906C61.228,82.023,59.638,83.614,57.681,83.614z M44.775,77.614c-0.853,0-1.547,0.694-1.547,1.547v0.906c0,0.853,0.694,1.547,1.547,1.547h12.906c0.853,0,1.547-0.694,1.547-1.547v-0.906c0-0.853-0.694-1.547-1.547-1.547H44.775z"
          />
          <path
            fill="#6474a6"
            d="M56.874,83.073c0,2.833-4.427,3.552-5.745,3.552c-3.106,0-5.623-1.646-5.623-3.677"
          />
          <path
            fill="#1f212b"
            d="M51.129 87.625c-3.714 0-6.623-2.054-6.623-4.677 0-.552.447-1 1-1s1 .448 1 1c0 1.451 2.117 2.677 4.623 2.677 1.047 0 4.745-.611 4.745-2.552 0-.552.447-1 1-1s1 .448 1 1C57.874 86.512 53.33 87.625 51.129 87.625zM70.103 38.739c-.276 0-.5-.224-.5-.5 0-1.682-.233-3.345-.692-4.944-.076-.266.077-.542.343-.619.264-.078.542.077.618.342.485 1.688.731 3.445.731 5.22C70.603 38.516 70.38 38.739 70.103 38.739zM68.148 30.482c-.183 0-.358-.101-.446-.275-2.562-5.085-7.434-8.674-13.03-9.602-.966-.16-1.957-.241-2.943-.241-.276 0-.5-.224-.5-.5s.224-.5.5-.5c1.041 0 2.087.086 3.107.255 5.91.979 11.054 4.769 13.759 10.138.124.247.025.547-.222.671C68.302 30.465 68.224 30.482 68.148 30.482z"
          />
        </svg>
      </div>
    </div>
  );
}

export default Bulb;
