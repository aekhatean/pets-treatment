import "../styles/sidebar.css";
import "../styles/master.css";
import homeImg from "../assets/homeImage.png";
import getStarted from "../assets/GetStartedImg.png";
import Saleh from "../assets/saleh.jpg";

import React, { useEffect, useState, useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { content } from "../translation/translation";
import { axiosInstance } from "../api";
import axios from "axios";
import DoctorCard from "../components/DoctorCard";
import { maxHeight, maxWidth } from "@mui/system";
import Ratings from "../components/Ratings";

var firstname = "";
var lastname = "";
var u_city = "";
var u_area = "";
var c_name = "";
var c_city = "";
var c_area = "";
var specialization = "";

function Doctors(props) {
  const { lang } = useContext(LanguageContext);
  const filter_by_tag = props.location.state;
  if (filter_by_tag) {
    console.log(filter_by_tag.specialization);
  }
  function filterChinging(event) {
    firstname = document.getElementById("first_name").value;
    lastname = document.getElementById("last_name").value;
    u_city = document.getElementById("doctor_city").value;
    u_area = document.getElementById("doctor_area").value;
    c_name = document.getElementById("clinic_name").value;
    c_city = document.getElementById("clinic_city").value;
    c_area = document.getElementById("clinic_area").value;
    specialization = document.getElementById("specailization").value;
    axios(config)
      .then((res) => {
        if (res.status === 200) {
          updatealldoctors(res.data);
        }
      })
      .catch((err) => console.log(err));
    event.preventDefault();
  }

  //  let data = JSON.stringify( mydata);
  let config = {
    method: "get",
    url: `http://127.0.0.1:8000/users/finddoctor/`,
    params: {
      user__first_name: firstname,
      user__last_name: lastname,
      profile__city: u_city,
      profile__area: u_area,
      clinics__name: c_name,
      clinics__city: c_city,
      clinics__area: c_area,
      specialization__name: specialization
        ? specialization
        : filter_by_tag && filter_by_tag.specialization,
    },
  };

  const [doctors, updatealldoctors] = useState([]);
  useEffect(() => {
    axios(config)
      .then((res) => {
        if (res.status === 200) {
          updatealldoctors(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="Container px-5 my-5" dir={lang === "ar" ? "rtl" : "ltr"}>
        <div className="row">
          <div
            className="col-lg-3 col-sm-12 d-flex justify-content-center my-4 shadow"
            style={{ borderRadius: "10px", height: "80vh" }}
          >
            <form className="m-auto">
              <p className="display-5 fw-bold">{content[lang].search}</p>
              <div>
                <input
                  type="text"
                  placeholder={content[lang].fist_name}
                  className="form-control my-2"
                  name="doctor_first_name"
                  id="first_name"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder={content[lang].last_name}
                  className="form-control my-2"
                  name="doctor_last_name"
                  id="last_name"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder={content[lang].area}
                  className="form-control my-2"
                  name="doctor_area"
                  id="doctor_area"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder={content[lang].city}
                  className="form-control my-2"
                  name="doctor_city"
                  id="doctor_city"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder={content[lang].clinic_name}
                  className="form-control my-2"
                  name="clinic_name"
                  id="clinic_name"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder={content[lang].clinic_city}
                  className="form-control my-2"
                  name="clinic_city"
                  id="clinic_city"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder={content[lang].clinic_area}
                  className="form-control my-2"
                  name="clinic_area"
                  id="clinic_area"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder={content[lang].specialization}
                  className="form-control my-2"
                  name="specailization"
                  id="specailization"
                />
              </div>
              <input
                type="submit"
                class="btn btn-primary my-2 w-100"
                onClick={(event) => filterChinging(event)}
                value={content[lang].search}
              />
            </form>
          </div>

          <div className="col-lg-9 col-sm-12">
            {/* ///////////////////////////////// */}

            <div class="container mt-2 ">
              <div class="row d-flex justify-content-center">
                <div class="col-12 ">
                  <div class="card p-4 mt-3 shadow pets_doctor_background">
                    <h3 class="heading mt-5 text-center text-white">
                      {content[lang].search_qoute}
                    </h3>
                    <div class="d-flex justify-content-center px-5"></div>
                    <div class="row mt-4 g-1 px-4 mb-5">
                      <div class="col-md-3">
                        <div class="card-inner p-3 d-flex flex-column align-items-center">
                          <img
                            src="https://i.imgur.com/Mb8kaPV.png"
                            width="50"
                          />
                          <div class="text-center mg-text">
                            {" "}
                            <span class="mg-text">Account</span>{" "}
                          </div>
                        </div>
                      </div>
                      {/* <div class="col-md-2">
                        <div class="card-inner p-3 d-flex flex-column align-items-center"> <img src="https://i.imgur.com/ueLEPGq.png" width="50"/>
                            <div class="text-center mg-text"> <span class="mg-text">Payments</span> </div>
                        </div>
                    </div> */}
                      {/* <div class="col-md-2">
                        <div class="card-inner p-3 d-flex flex-column align-items-center"> <img src="https://i.imgur.com/tmqv0Eq.png" width="50"/>
                            <div class="text-center mg-text"> <span class="mg-text">Delivery</span> </div>
                        </div>
                    </div> */}
                      <div class="col-md-3">
                        <div class="card-inner p-3 d-flex flex-column align-items-center">
                          {" "}
                          <img
                            src="https://i.imgur.com/D0Sm15i.png"
                            width="50"
                          />
                          <div class="text-center mg-text">
                            {" "}
                            <span class="mg-text">Product</span>{" "}
                          </div>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="card-inner p-3 d-flex flex-column align-items-center">
                          {" "}
                          <img
                            src="https://i.imgur.com/Z7BJ8Po.png"
                            width="50"
                          />
                          <div class="text-center mg-text">
                            {" "}
                            <span class="mg-text">Return</span>{" "}
                          </div>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="card-inner p-3 d-flex flex-column align-items-center">
                          {" "}
                          <img
                            src="https://i.imgur.com/YLsQrn3.png"
                            width="50"
                          />
                          <div class="text-center mg-text">
                            {" "}
                            <span class="mg-text">Guarantee</span>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* //////////////////////////////////////// */}

            {/* //////////////////////////////////////////////////////////////////////////////// */}

            <div class="container mt-2">
              <div class="row d-flex justify-content-center">
                <div className="col-12 text-center my-3">
                  {doctors.map((feed) => (
                    <DoctorCard key={feed.id} doctor={feed}></DoctorCard>
                  ))}
                </div>
              </div>
            </div>

            {/* /////////////////////////////////////////////////////////////////////////////////////// */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Doctors;
