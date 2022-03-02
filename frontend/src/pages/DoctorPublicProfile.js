import React, { useEffect, useState } from "react";
import { axiosInstance } from "../api";
import ProfilePicture from "../components/ProfilePicture";
import Tag from "../components/Tag";
import StarIcon from "@mui/icons-material/Star";
import { Tabs, Tab, Container, Row, Col } from "react-bootstrap";
import ClinicPanel from "../components/ClinicPanel";
import FeedbacksList from "../components/FeedbacksList";
import Ratings from "../components/Ratings";
import TagList from "../components/TagList";
import DescriptionText from "../components/DescriptionText";
import TitleText from "../components/TitleText";
import SubtitleText from "../components/SubtitleText";

function DoctorPublicProfile(props) {
  const { id } = props.match.params;
  const [doctor, setDoctor] = useState({
    first_name: "",
    last_name: "",
    location: "",
    picture: "",
    description: "",
    specializations: [],
    rating: 0,
    clinics: [],
  });
  const [key, setKey] = useState(doctor.clinics[0]);
  useEffect(() => {
    axiosInstance
      .get(`users/doctors/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setDoctor({
            first_name: res.data.user.first_name,
            last_name: res.data.user.last_name,
            location: `${res.data.profile.area}, ${res.data.profile.city}, ${res.data.profile.country}`,
            picture: res.data.profile.picture,
            description: res.data.description,
            specializations: [...res.data.specialization],
            rating: res.data.average_rate,
            clinics: [...res.data.clinics],
          });
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <Container>
      <Row>
        <Col>
          <div className="float-start">
            {/* doctor picture */}
            <ProfilePicture src={`http://localhost:8000${doctor.picture}`} />
            {/* doctor fullname */}
            <TitleText title={`Dr.${doctor.first_name} ${doctor.last_name}`} />

            <Ratings rating={doctor.rating} />
            <div>
              <SubtitleText subtitle="about the doctor" />
              <DescriptionText description={doctor.description} />
            </div>

            {/* doctor location muted */}
            {/* doctor description */}

            {/* doctor  specializations --> tags/badges */}
            <TagList tags={doctor.specializations} />
            {/* doctor  total ratings ---> stars*/}

            {/* doctor  clinics tabs*/}
          </div>
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
          >
            {doctor.clinics.map((clinic) => (
              <Tab key={clinic.id} eventKey={clinic.id} title={clinic.area}>
                <ClinicPanel clinic_id={clinic.id} doctor_id={id} />
              </Tab>
            ))}
          </Tabs>
          {/* doctor  all ratings with feedbacks */}
          <FeedbacksList doctor_id={id} />
        </Col>
      </Row>
    </Container>
  );
}

export default DoctorPublicProfile;
