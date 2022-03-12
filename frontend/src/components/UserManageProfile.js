import { useEffect, useState, useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

// Bootsratp
import { Container, Row, Col } from "react-bootstrap";

// API consumption
import { axiosInstance } from "../api";

// Language
import { content } from "../translation/translation";
import UserProfileView from "./UserProfileView";
import UserProfileEdit from "./UserProfileEdit";

const getUserData = (res, setData) => {
  if (res.status === 200) {
    setData(res.data.data);
  }
};

export default function UserManageProfile(props) {
  const { lang } = useContext(LanguageContext);
  const [userData, setUserData] = useState({});
  const [viewPanelState, setViewPanelState] = useState(true);
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

  if (viewPanelState) {
    return (
      <Container
        dir={lang === "ar" ? "rtl" : "ltr"}
        className="text-md-start mb-5"
      >
        <UserProfileView userData={userData} />
        <Row>
          <Col className={`${lang === "en" ? "text-start" : "text-end"}`}>
            <button
              className={`btn blue-bg text-white rounded border-0 p-3 text-light`}
              onClick={() => setViewPanelState(!viewPanelState)}
            >
              {content[lang].editAccountInfo}
            </button>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return (
      <Container
        dir={lang === "ar" ? "rtl" : "ltr"}
        className={`text-md-start mb-5 mt-5 ${
          lang === "en" ? "text-start" : "text-end"
        }`}
      >
        <UserProfileEdit userData={userData} />
        <Container
          className={`text-md-start mb-5 mt-5 ${
            lang === "en" ? "text-start" : "text-end"
          }`}
        >
          <Row>
            <Col className={`${lang === "en" ? "text-start" : "text-end"}`}>
              <button
                className="btn btn-danger rounded border-0 text-light"
                onClick={() => setViewPanelState(!viewPanelState)}
              >
                {content[lang].cancel}
              </button>
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}
