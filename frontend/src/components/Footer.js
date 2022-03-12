import "../style.css";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ContactUs from "./ContactUs";
import { content } from "../translation/translation";
import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { colors } from "../colors/colors";
import LogoBlond from "../assets/LogoBlond.png";
import { Container, Image } from "react-bootstrap";

const Footer = () => {
  const { lang } = useContext(LanguageContext);

  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      style={{ backgroundColor: colors.bg.primary }}
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <div className="d-flex justify-content-between">
              <div className="mx-auto my-auto">
                <Image
                  src={LogoBlond}
                  alt="how-it-works-cat"
                  fluid
                  width={300}
                />
              </div>

              <div
                className="vr my-5 ms-3 me-0 d-none d-md-block"
                style={{ height: "300px" }}
              ></div>
            </div>
            <hr className="my-3 d-block d-md-none w-50 mx-auto" />
          </div>

          <div className="col-md-4">
            <div>
              <div className="d-flex justify-content-between">
                <div className="mx-auto my-auto">
                  <h4 className="mt-md-2 mb-md-4 my-3 fw-bold text-center">
                    {lang === "ar" ? content.ar.services : content.en.services}
                  </h4>
                  <ul className="d-flex flex-column align-items-center">
                    <li>{content[lang].vet_checkup}</li>
                    <li>{content[lang].vet_derma}</li>
                    <li>{content[lang].service_vet}</li>
                  </ul>
                  <hr className="my-3 d-block d-md-none mx-auto" />

                  <div className="d-flex flex-column justify-content-center">
                    <h4 className="mt-md-3 mb-md-4 my-3 fw-bold">
                      {lang === "ar"
                        ? content.ar.informations
                        : content.en.informations}
                    </h4>
                    <p>
                      <EmailIcon />
                      <span className="px-2">
                        noreply.pets.treatment@gmail.com
                      </span>
                    </p>
                    <p>
                      <LocalPhoneIcon />
                      <span className="px-2">+201115448989</span>
                    </p>
                  </div>
                  <hr className="my-3 d-block d-md-none mx-auto" />
                </div>
                <div
                  className="vr my-5 ms-3 me-0 d-none d-md-block"
                  style={{ height: "300px" }}
                ></div>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <Container className="my-4 p-3">
              <ContactUs />
            </Container>
          </div>
          <div
            className="d-flex justify-content-center text-white"
            style={{ backgroundColor: colors.bg.blue }}
          >
            <span className="my-2 fw-bold">
              {lang === "ar" ? content.ar.rights : content.en.rights}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
