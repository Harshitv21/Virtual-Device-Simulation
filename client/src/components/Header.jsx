import "../styles/Header.css";

function Header() {
  return (
    <div className="headerComponent">
      <h1>
        Controlling devices remotely (Client){" "}
        <img
          width="24"
          height="24"
          src="https://img.icons8.com/material-two-tone/24/doorbell.png"
          alt="doorbell"
        />
      </h1>
    </div>
  );
}

export default Header;
