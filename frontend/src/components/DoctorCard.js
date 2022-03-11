
import "../styles/doctor_card.css";
import Ratings from "./Ratings";
import React, { useEffect, useState, useContext } from "react";
import { axiosInstance } from "../api";
import ScheduleCard from "./ScheduleCard";
import { Link } from "react-router-dom";
function DoctorCard(props) {
  const [schedules, setschedule] = useState([]);
  useEffect(() => {
    axiosInstance
      .get(`users/schedule/doctor/${props.doctor["id"]}`)
      .then((res) => {
        if (res.status === 200) {
          setschedule(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div class="container mt-2">
        <div class="row d-flex justify-content-center">
          <div className="col-12 text-center my-3">
            <div className="card mb-3 card_height shadow">
              <div className="row g-0">
                <div className="col-2 mt-2 ml-2">
                  <Link
                    to={`/doctors/${props.doctor["id"]}`}
                    className="nonlink"
                  >
                    <img
                      src={props.doctor["profile"].picture}
                      className="img-fluid rounded-circle img_height"
                      alt="..."
                    />
                  </Link>
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title text-start">
                      Dr.{props.doctor["user"].first_name}{" "}
                      {props.doctor["user"].last_name}
                    </h5>
                    <p className=" text-start ">
                      Pets doctor graduated from helwan university
                    </p>
                    <p className=" text-start">
                      <Ratings rating={props.doctor["average_rate"]} />
                    </p>
                    <p className=" text-start">
                      {props.doctor["profile"].city},
                      {props.doctor["profile"].country}
                    </p>
                    <p className=" text-start overdescription">
                      {props.doctor["description"]}
                    </p>
                    <p className="card-text">
                      <small class="text-muted">
                        <div className="doctor_schedule">
                          <div
                            className="scrolling-wrapper"
                            style={{
                              overflowX: "auto",
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            {/* ////////////////////////////////// */}

                            {schedules.map((feed) => (
                              <ScheduleCard
                                key={feed.id}
                                schedule={feed}
                                doctor_id={props.doctor["id"]}
                              ></ScheduleCard>
                            ))}

                            {/* /////////////////////////////// */}
                          </div>
                        </div>
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DoctorCard;
