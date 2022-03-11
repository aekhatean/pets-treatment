import React, { useContext } from "react";
import get from "../assets/contact_form.png";
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
                  We Care For <span className="d-md-block">Your Pet</span>
                </h1>
                <p className="mb-4">
                  We always try to provide your pet the best
                  <span className="d-block">services.</span>
                </p>
              </div>
            </div>
            <div className="col-md-5 align-self-end text-center text-md-right">
              <img src={get} className="cover-img" />
            </div>
          </div>
        </div>
      </section>
      <div className="get-started">
        <div className="heading-section">
          <h2 className="text-black">
            Everything Your Pet Needs All in One Place. Get Started Now!
          </h2>
          <br></br>
          <Link to="/petowner_register" className="btn-1">
            {content[lang].pet_owner}
          </Link>
          <Link to="/doctor_register" className="btn-2">
            Veterinarian
          </Link>
        </div>
      </div>
      <section class="site-section " id="services-section">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-6 text-center heading-section mb-5">
              <h2 class="text-black mb-2">Our Services</h2>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mb-4 col-lg-4">
              <div class="block_service">
                <img src={dogger_checkup} alt="mb-5" />
                <h3>Pet Checkup</h3>
                <p>
                  Far far away, behind the word mountains, far from the
                  countries Vokalia and Consonantia, there live the blind texts.
                </p>
              </div>
            </div>
            <div class="col-md-6 mb-4 col-lg-4">
              <div class="block_service">
                <img src={dogger_dermatology} alt="mb-5" />
                <h3>Pet Dermatology</h3>
                <p>
                  Far far away, behind the word mountains, far from the
                  countries Vokalia and Consonantia, there live the blind texts.
                </p>
              </div>
            </div>

            <div class="col-md-6 mb-4 col-lg-4">
              <div class="block_service">
                <img src={dogger_veterinarian} alt="mb-5" />
                <h3>Expert Veterinarians</h3>
                <p>
                  Far far away, behind the word mountains, far from the
                  countries Vokalia and Consonantia, there live the blind texts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
