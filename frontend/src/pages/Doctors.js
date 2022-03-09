
import '../styles/sidebar.css'
import '../styles/master.css'
import homeImg from "../assets/homeImage.png";
import getStarted from "../assets/GetStartedImg.png";



import React, { useEffect, useState, useContext } from "react";
import { axiosInstance } from "../api";
import axios from 'axios';
import DoctorCard from '../components/DoctorCard';


var firstname=''
var lastname=''
var u_city=''
var u_area=''
var c_name=''
var c_city=''
var c_area=''


function Doctors() {

  function filterChinging(event) {
 firstname=document.getElementById("first_name").value,
 lastname=document.getElementById("last_name").value,
 u_city=document.getElementById("doctor_city").value,
 u_area=document.getElementById("doctor_area").value,
 c_name=document.getElementById("clinic_name").value,
 c_city=document.getElementById("clinic_city").value,
 c_area=document.getElementById("clinic_area").value,
 axios(config).then((res) => {
  if (res.status === 200) {
    updatealldoctors(res.data);
  }
})
.catch((err) => console.log(err));
  event.preventDefault();
  

}

// "user__first_name","user__last_name","clinics__name","specialization__name","clinics__city","clinics__area","clinics__country","profile__city","profile__country","profile__area"




//  const mydata={
//     find: "cairo",
//     filters: {
//         areas: [],
//         cities: [],
//         countries: [],
//         specializations: []
//     }
// }



//  let data = JSON.stringify( mydata);
let config = {
    method: 'get',
    url: `http://127.0.0.1:8000/users/finddoctor/`,
    params:{
      'user__first_name':firstname,
      'user__last_name':lastname,
      'profile__city':  u_city,
      'profile__area':  u_area,
      'clinics__name':  c_name,
      'clinics__city':  c_city,
      'clinics__area':  c_area,
    }
}




  const [doctors, updatealldoctors] = useState([]);
  useEffect(() => {

      axios(config).then((res) => {
        if (res.status === 200) {
          updatealldoctors(res.data);
        }
      })
      .catch((err) => console.log(err));
  });
 

  return ( <>
  <div className='mybody'>
  <div className='sidebar'>
  
        <form>
        <div>
            <input type="text" placeholder="doctor first name.." class="form-control" name="doctor_first_name" id='first_name' />
          </div>
          <div>
            <input type="text" placeholder="doctor last name.." class="form-control" name="doctor_last_name" id='last_name'/>
          </div>
          <div>
            <input type="text" placeholder="doctor area.." class="form-control" name="doctor_area" id='doctor_area'/>
          </div>
          <div>
            <input type="text" placeholder="doctor city.." class="form-control" name="doctor_city" id='doctor_city'/>
          </div>
          <div>
            <input type="text" placeholder="clinic name.." class="form-control" name="clinic_name" id='clinic_name'/>
          </div>
          <div>
            <input type="text" placeholder="clinic city.." class="form-control" name="clinic_city" id='clinic_city'/>
          </div>
          <div>
            <input type="text" placeholder="clinic area.." class="form-control" name="clinic_area" id='clinic_area'/>
          </div>
          {/* <div>
            <input type="text" placeholder="clinic name.." class="form-control" name="clinic_name" />
          </div> */}
           {/* <div className="search1 formchild">
            <input type="text" placeholder="Search.." class="form-control" name="search" />
            <button type="submit">
              <i className="fa fa-search"></i>
            </button>
          </div> */}
          {/* <div> */}
          {/* <select name="city" id="city" defaultValue={"DEFAULT"} required className="formchild">
            <option value="DEFAULT" disabled>
              City
            </option>
            <option value="Cairo">Cairo</option>
                <option value="Alexandria">Alexandria</option>
                <option value="Giza">Giza</option>
                <option value="Qalyubia">Qalyubia</option>
                <option value="Port Said">Port Said</option>
                <option value="Suez">Suez</option>
                <option value="Gharbia">Gharbia</option>
                <option value="Luxor">Luxor</option>
                <option value="Mansoura">Mansoura</option>
                <option value="Asyut">Asyut</option>
                <option value="Ismailia">Ismailia</option>
                <option value="Faiyum">Faiyum</option>
                <option value="Sharqia">Sharqia</option>
                <option value="Damietta">Damietta</option>
                <option value="Aswan">Aswan</option>
                <option value="Minya">Minya</option>
                <option value="Beheira">Beheira</option>
                <option value="Beni Suef">Beni Suef</option>
                <option value="Red Sea">Red Sea</option>
                <option value="Qena">Qena</option>
                <option value="Sohag">Sohag</option>
                <option value="North Sinai">North Sinai</option>
          </select> */}
{/* <input type="text" placeholder="city.." class="form-control" name="city" />

          </div>
          <div>
            <input type="text" placeholder="area.." class="form-control" name="area" />
          </div>
          <div>
          <select
            name="specialization"
            id="specialization"
            defaultValue={"DEFAULT"}
            required  className="formchild">
            <option value="DEFAULT" disabled>
              Specialization
            </option>
            <option value="Cardiology">Cardiology</option>
            <option value="Neurology">Neurology</option>
            <option value="Oncology">Oncology</option>
            <option value="Nutrition">Nutrition</option>
          </select>
          </div> */}

<input type="submit" class="btn btn-primary" onClick={(event)=>filterChinging(event)} value="search"/>
        </form>
      </div>

  <div className='parent_cards_div'>
  {doctors.map((feed) => (
            <DoctorCard key={feed.id} doctor={feed}></DoctorCard>
          ))}

  
  </div>

  </div>









  </> );
}

export default Doctors;
