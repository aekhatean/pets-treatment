import React from "react";
import AboutUsImage from "../assets/AboutUsImage.png";
import "../style.css";
import Khaled from "../assets/khaled.jpg";
import Adham from "../assets/adham.jpg";
import Alaa from "../assets/alaa.jpg";
import Saleh from "../assets/saleh.jpg";
import AyaMaged from "../assets/maged_basha.jpg";
import AyaMohammed from "../assets/mohammed_basha.jpg";

function About() {
  const teamList = [
    { name: "Ahmed Khaled Sayed", src: Khaled },
    { name: "Adham Essam Khatean", src: Adham },
    { name: "Ahmed Alaa Ibrahim", src: Alaa },
    { name: "Ahmed Mahmoud Saleh", src: Saleh },
    { name: "Aya Maged Mohamed", src: AyaMaged },
    { name: "Aya Mohamed Ibrahim", src: AyaMohammed },
  ];

  return (
    <div className="container">
      <img className="img-fluid px-3" src={AboutUsImage} alt="AboutUsImage" />
      <p className="display-6 mt-5 px-3">
        Driven by our love and passion to help pets until they find the care
        they need.
      </p>
      <hr className="mt-5" />
      <h1 className="display-4 fw-bold secondary-color my-5 text-center">
        About Us
      </h1>
      <p className="display-6 px-3">
        A pet to It’s owner is like a family member and pure best friend.But
        with every awesome thing comes responsibilities, Therefore caring for
        your loyal friend sometimes becomes a challenge for you. That’s why we
        are here to make your life easier for both of you, make your parenting
        experience more comfortable and safer. We built a community of vets
        around you with ratings to help you choose the best place to go.
      </p>
      <hr className="mt-5" />
      <h1 className="display-4 fw-bold secondary-color my-5 text-center">
        Our Team
      </h1>
      <div className="row">
        {teamList.map((member) => {
          return (
            <div className="col-lg-4 col-md-6 my-4">
              <img
                className="img-fluid shadow-sm rounded"
                src={member.src}
                alt={`${member.name}'s Images`}
              />
              <p className="fw-bold h4 mt-4">{member.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default About;
