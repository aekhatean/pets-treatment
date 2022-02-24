import React from "react";
import homeImg from "../assets/homeImage.png";
import getStarted from "../assets/GetStartedImg.png";

function Home() {
  return (
    <div>
      <h1>Get the best treatment for your pet right at the moment.</h1>
      <div className="form">
        <img src={homeImg} alt="landing img" className="home-img" />
        <form className="form-content">
          <div className="search">
            <input type="text" placeholder="Search.." name="search" />
            <button type="submit">
              <i className="fa fa-search"></i>
            </button>
          </div>
          <select name="city" id="city" defaultValue={"DEFAULT"} required>
            <option value="DEFAULT" disabled>
              City
            </option>
            <option value="Cairo">Cairo</option>
            <option value="Alexandria">Alexandria</option>
          </select>
          <select name="Area" id="area" defaultValue={"DEFAULT"} required>
            <option value="DEFAULT" disabled>
              Area
            </option>
            <option value="Settelement">New Settelement</option>
            <option value="nasrCity">Nasr-city</option>
            <option value="Giza">Giza</option>
            <option value="6thOctober">6th October</option>
          </select>
          <select
            name="specialization"
            id="specialization"
            defaultValue={"DEFAULT"}
            required>
            <option value="DEFAULT" disabled>
              Specialization
            </option>
            <option value="Cardiology">Cardiology</option>
            <option value="Neurology">Neurology</option>
            <option value="Oncology">Oncology</option>
            <option value="Nutrition">Nutrition</option>
          </select>
        </form>
      </div>
      <div className="get-started">
        <img src={getStarted} alt="cat-img" />
        <div>
          <h1>Everything your pet needs All in one place. Get Started now!</h1>
          <button className="btn-1">Pet Owner</button>
          <button className="btn-2">Veterinarian</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
