import Logo from "../assets/Logo.png";
import "../style.css";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ContactUs from "./ContactUs";

const Footer = () => {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#b8d8d6"
          fillOpacity="1"
          d="M0,128L26.7,122.7C53.3,117,107,107,160,133.3C213.3,160,267,224,320,261.3C373.3,299,427,309,480,272C533.3,235,587,149,640,144C693.3,139,747,213,800,213.3C853.3,213,907,139,960,122.7C1013.3,107,1067,149,1120,165.3C1173.3,181,1227,171,1280,165.3C1333.3,160,1387,160,1413,160L1440,160L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"
        ></path>
      </svg>
      <div className="container-fluid primary-bg">
        <div className="row">
          <div className="col-md-3">
            <div className="d-flex justify-content-between">
              <div className="mx-auto my-auto">
                <img src={Logo} className="img-fluid" alt="logo" />
                <p className="h3 my-3">Petsania</p>
              </div>
              <div
                className="vr my-5 ms-3 me-0 d-none d-md-block"
                style={{ height: "300px" }}
              ></div>
            </div>
          </div>

          <div className="col-md-4">
            <div>
              <div className="d-flex justify-content-between">
                <div className="mx-auto my-auto">
                  <p className="h4 mt-2 mb-4 fw-bold text-center">Services</p>
                  <ul className="d-flex flex-column align-items-center">
                    <li>Vets</li>
                    <li>Pets Medicine</li>
                  </ul>
                  <div className="d-flex flex-column justify-content-center">
                    <p className="h4 mt-3 mb-4 fw-bold">Information</p>
                    <p>
                      <EmailIcon />
                      <span className="px-2">support@petsania.com</span>
                    </p>
                    <p>
                      <LocalPhoneIcon />
                      <span className="px-2">+201115448989</span>
                    </p>
                  </div>
                </div>
                <div
                  className="vr my-5 ms-3 me-0 d-none d-md-block"
                  style={{ height: "300px" }}
                ></div>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <ContactUs />
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
