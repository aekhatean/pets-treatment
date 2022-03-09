import Saleh from "../assets/saleh.jpg";
import '../styles/doctor_card.css'
import ProfilePicture from "./ProfilePicture";
import { Container, Row, Col ,Card} from "react-bootstrap";
import StarIcon from "@mui/icons-material/Star";
import Ratings from "./Ratings";
import React, { useEffect, useState, useContext } from "react";
import { axiosInstance } from "../api";
import ScheduleCard from "./ScheduleCard";
import { Link } from "react-router-dom";
function DoctorCard(props) {

  const [schedules, setschedule] = useState([]);
  useEffect(() => {
    axiosInstance
      .get(`users/schedule/doctor/${props.doctor['id']}`)
      .then((res) => {
        if (res.status === 200) {
          setschedule(res.data);
        }
      })
      .catch((err) => console.log(err));
  });







    return ( <>
    <Link to={`/doctors/${props.doctor['id']}`} className="nonlink">
    <div class='doctor_card'>
        {/* leftdiv */}
        <div className='card_left'>
        <img
                className="doctor_image"
                src={props.doctor['profile'].picture}
              />
        </div>
        {/* center div */}
        {/* header div */}
<div className='card_center'>
<div className="doctor_header"><div className="doctor_name">Dr.{props.doctor['user'].first_name} {props.doctor['user'].last_name}</div>
<div className="doctor_rating" style={{marginLeft:"30px"}}> 
<Ratings rating={props.doctor['average_rate']} />



</div>

<div className="doctor_address">{props.doctor['profile'].city},{props.doctor['profile'].country}</div>

<div className="doctor_description">{props.doctor['description']}</div>



<div className="doctor_schedule">
<div className="scrolling-wrapper"style={{ overflowX: "auto", display: "flex",justifyContent:"space-between"}}>
{/* <div className="col-1"></div> */}

{schedules.map((feed) => (
            <ScheduleCard key={feed.id} schedule={feed}></ScheduleCard>
          ))}
      </div>
     
</div>





</div>




        </div>

        <div className="card_right">   </div>
    </div>
    </Link>
    
    </> );
}

export default DoctorCard;