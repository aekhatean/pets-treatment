import { useContext } from "react";

// Bootsratp
import { Container, Row, Col, Spinner } from "react-bootstrap";

// Components
import ProfilePicture from "./ProfilePicture";

// Language
import { LanguageContext } from "../context/LanguageContext";
import { content } from "../translation/translation";


export default function UserProfileView(props) {
    const { lang, setLang } = useContext(LanguageContext);
    const userData = props.userData
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
          </Container>
        );
      } else {
        return <Spinner animation="border" variant="info" />;
      }
    
}
