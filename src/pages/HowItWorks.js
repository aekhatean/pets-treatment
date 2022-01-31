import "../style.css";
import PetPaw from "../assets/pet-paw.png";
function HowItWorks() {
  return (
    <div className="dashed-line-container">
      <div className="dashed-line"></div>
      <img
        src={PetPaw}
        alt="Pet Paw"
        className="pet-paw"
        style={{ top: "0%" }}
      />
      <span className="how-it-works-right" style={{ top: "0%" }}>
        Hello from right
      </span>
      <img
        src={PetPaw}
        alt="Pet Paw"
        className="pet-paw"
        style={{ top: "14.2%" }}
      />
      <span className="how-it-works-left" style={{ top: "14.2%" }}>
        Hello from left
      </span>
      <img
        src={PetPaw}
        alt="Pet Paw"
        className="pet-paw"
        style={{ top: "28.4%" }}
      />
      <img
        src={PetPaw}
        alt="Pet Paw"
        className="pet-paw"
        style={{ top: "42.6%" }}
      />
      <img
        src={PetPaw}
        alt="Pet Paw"
        className="pet-paw"
        style={{ top: "56.8%" }}
      />
      <img
        src={PetPaw}
        alt="Pet Paw"
        className="pet-paw"
        style={{ top: "71%" }}
      />
      <img
        src={PetPaw}
        alt="Pet Paw"
        className="pet-paw"
        style={{ top: "85.2%" }}
      />
      <img
        src={PetPaw}
        alt="Pet Paw"
        className="pet-paw"
        style={{ top: "100%" }}
      />
      <img
        src={PetPaw}
        alt="Pet Paw"
        className="pet-paw"
        style={{ top: "100%" }}
      />
    </div>
  );
}

export default HowItWorks;
