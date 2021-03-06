import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { axiosInstance } from "../api";
import ProfilePicture from "../components/ProfilePicture";
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
  const [noDoctor, setDoctorNotFound] = useState(false);

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
          setDoctorNotFound(false);
        }
      })
      .catch((err) => {
        console.log(err);
        return setDoctorNotFound(true);
      });
  }, [id]);
  if (noDoctor) {
    return <Redirect to="/error404" />;
  }
  return (
    <Container
      className="my-5 "
      dir={lang === "ar" ? "rtl" : "ltr"}
      style={{ borderRadius: 20, backgroundColor: colors.bg.light }}
    >
      <Row>
        <Col>
          <div className="p-0">
            <Row>
              <Col className="m-4">
                {/* doctor picture */}
                <ProfilePicture src={doctor.picture} />
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
              style={{ backgroundColor: colors.bg.primary, borderRadius: 10 }}
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
              <TagList tags={doctor.specializations} clickable={true} />
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
              <Tab
                className="shadow-sm  bg-light mx-3"
                key={clinic.id}
                eventKey={clinic.id}
                title={clinic.area}
                style={{ borderRadius: 10 }}
              >
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
