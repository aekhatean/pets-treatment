import React, { useContext } from "react";
import hero from "../assets/contact_form.png";
import dogger_checkup from "../assets/dogger_checkup.svg";
import dogger_dermatology from "../assets/dogger_dermatology.svg";
import dogger_veterinarian from "../assets/dogger_veterinarian.svg";
import { Link } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";
import { content } from "../translation/translation";
import "../styles/home.css";
function Home() {
  const { lang, setLang } = useContext(LanguageContext);
  return (
    <div>
      <section className="site-blocks-cover overflow-hidden">
        <div className="container">
          <div className="row">
            <div className="col-md-7 align-self-center text-center text-md-left">
              <div className="intro-text">
                <h1>
                  {content[lang].home_slogan1}
                  <span className="d-md-block">
                    {content[lang].home_slogan2}
                  </span>
                </h1>
                <p className="mb-4">
                  {content[lang].home_slogan3}
                  <span className="d-block">{content[lang].home_slogan4}</span>
                </p>
              </div>
              <Link to="/doctors" className="btn-1">
                {content[lang].search_call}
              </Link>
            </div>
            <div className="col-md-5 align-self-end text-center text-md-right">
              <img src={hero} className="cover-img" />
            </div>
          </div>
        </div>
      </section>
      <div className="get-started">
        <div className="heading-section">
          <h2 className="text-black">{content[lang].home_banner}</h2>
          <br></br>
          <Link to="/petowner_register" className="btn-1">
            {content[lang].pet_owner}
          </Link>
          <Link to="/doctor_register" className="btn-2">
            {content[lang].veterinarian}
          </Link>
        </div>
      </div>
      <section className="site-section " id="services-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 text-center heading-section mb-5">
              <h2 className="text-black mb-2">{content[lang].services}</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-4 col-lg-4">
              <div className="block_service">
                <img src={dogger_checkup} alt="mb-5" />
                <h3>{content[lang].vet_checkup}</h3>
                <p>{content[lang].service_checkup}</p>
              </div>
            </div>
            <div className="col-md-6 mb-4 col-lg-4">
              <div className="block_service">
                <img src={dogger_dermatology} alt="mb-5" />
                <h3>{content[lang].vet_derma}</h3>
                <p>{content[lang].service_derma}</p>
              </div>
            </div>

            <div className="col-md-6 mb-4 col-lg-4">
              <div className="block_service">
                <img src={dogger_veterinarian} alt="mb-5" />
                <h3> {content[lang].service_vet}</h3>
                <p>{content[lang].service_experts}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
