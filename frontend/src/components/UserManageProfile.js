import React, { useEffect, useState, useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

// Bootsratp
import { Container, Row, Col, Spinner } from "react-bootstrap";

// Components
import ProfilePicture from "./ProfilePicture";

// API consumption
import { axiosInstance } from "../api";

// Language
import { content } from "../translation/translation";

const getUserData = (res, setData) => {
  if (res.status === 200) {
    setData(res.data.data);
  }
};

export default function UserManageProfile(props) {
  const { lang, setLang } = useContext(LanguageContext);
  const [userData, setUserData] = useState([]);
  const userInfo = `users/profilelist`;
  useEffect(() => {
    axiosInstance
      .get(userInfo, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => getUserData(res, setUserData));
  }, [userInfo]);

  if (userData && Object.keys(userData).length) {
    return (
      <Container
        dir={lang === "ar" ? "rtl" : "ltr"}
        className="text-md-start mb-5"
      >
        <Row className="my-5">
          <Col md={3}>
            <ProfilePicture src={userData.picture} />
          </Col>
          <Col md={9} className="mt-4">
            <div>
              {userData.user.first_name} {userData.user.last_name}
            </div>
            <div>@{userData.user.username}</div>
            <div>
              {userData.city}, {userData.country}
            </div>
          </Col>
        </Row>
        <hr />
        <Row className="my-5">
          <Col>
            <div className="h3">{content[lang].contactInfo}</div>
            <p>
              <b>{content[lang].email}: &nbsp;</b>
              {userData.phone}
            </p>
            <p>
              <b>{content[lang].phone}: &nbsp;</b>
              {userData.user.email}
            </p>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <button className="secondary-dark-bg rounded border-0 p-3 text-light">
              {content[lang].editAccountInfo}
            </button>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return <Spinner animation="border" variant="info" />;
  }
}
