import React, { useEffect, useState, useContext } from "react";
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
import { LanguageContext } from "../context/LanguageContext";
import { content } from "../translation/translation";
import { colors } from "../colors/colors";

function DoctorPublicProfile(props) {
  const { id } = props.match.params;
  const { lang, setLang } = useContext(LanguageContext);

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
    <Container dir={lang === "ar" ? "rtl" : "ltr"}>
      <Row>
        <Col>
          <div className="">
            <Row>
              <Col className="m-4">
                {/* doctor picture */}
                <ProfilePicture
                  src={`http://localhost:8000${doctor.picture}`}
                />
                {/* doctor fullname */}
                <div>
                  <TitleText
                    title={`${content[lang].dr} ${doctor.first_name} ${doctor.last_name} `}
                  />
                  {/* doctor  total ratings ---> stars*/}
                  <div>
                    <Ratings rating={doctor.rating} />
                  </div>
                </div>
              </Col>
            </Row>
            {/* doctor description */}
            <div
              className={
                lang === "ar"
                  ? "shadow-sm m-2 p-3 text-end"
                  : "shadow-sm m-2 p-3 text-start"
              }
              style={{
                borderRadius: 10,
              }}
            >
              <SubtitleText subtitle={content[lang].about_dr} />
              <div className="m-1">
                <DescriptionText description={doctor.description} />
              </div>
            </div>

            {/* doctor  specializations --> tags/badges */}
            <div
              className={
                lang === "ar" ? "fs-5 text-end m-2" : "fs-5 text-start m-2"
              }
            >
              <TagList tags={doctor.specializations} />
            </div>

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
