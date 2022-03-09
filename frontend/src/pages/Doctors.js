
import '../styles/sidebar.css'
import '../styles/master.css'
import homeImg from "../assets/homeImage.png";
import getStarted from "../assets/GetStartedImg.png";



import React, { useEffect, useState, useContext } from "react";
import { axiosInstance } from "../api";
import axios from 'axios';
import DoctorCard from '../components/DoctorCard';

function Doctors() {

 const mydata={
    find: "cairo",
    filters: {
        areas: [],
        cities: [],
        countries: [],
        specializations: []
    }
}



 let data = JSON.stringify( mydata);
let config = {
    method: 'get',
    url: `http://127.0.0.1:8000/users/finddoctor/`,
    params:{
      'user__first_name':'ahmed'
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
         
           <div className="search1 formchild">
            <input type="text" placeholder="Search.." class="form-control" name="search" />
            <button type="submit">
              <i className="fa fa-search"></i>
            </button>
          </div>
          <div>
          <select name="city" id="city" defaultValue={"DEFAULT"} required className="formchild">
            <option value="DEFAULT" disabled>
              City
            </option>
            <option value="Cairo">Cairo</option>
            <option value="Alexandria">Alexandria</option>
          </select>
          </div>
          <div>
          <select name="Area" id="area" defaultValue={"DEFAULT"} required className="formchild">
            <option value="DEFAULT" disabled>
              Area
            </option>
            <option value="Settelement">New Settelement</option>
            <option value="nasrCity">Nasr-city</option>
            <option value="Giza">Giza</option>
            <option value="6thOctober">6th October</option>
          </select>
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
          </div>

<button type="submit" class="btn btn-primary">Submit</button>
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
