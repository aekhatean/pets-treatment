import { useEffect, useState, useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

// Bootsratp
import { Container, Row, Col, Spinner } from "react-bootstrap";

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
  const { lang, setLang } = useContext(LanguageContext);
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

  if (viewPanelState === true) {
    return (
      <Container
        dir={lang === "ar" ? "rtl" : "ltr"}
        className="text-md-start mb-5"
      >
        <UserProfileView userData={userData} />
        <Row>
          <Col>
            <button
              className="secondary-dark-bg rounded border-0 p-3 text-light"
              onClick={setViewPanelState(!viewPanelState)}
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
        className="text-md-start mb-5 mt-5"
      >
        <UserProfileEdit userData={userData} />
      </Container>
    );
  }
}
