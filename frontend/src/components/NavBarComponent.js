import React, { useContext, useState } from "react";
import { content } from "../translation/translation";
import { LanguageContext } from "../context/LanguageContext";
import { Link } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { colors } from "../colors/colors";
import Logo from "../assets/Logo.png";
import { routes } from "../routes/routes";
import LogedUser from "./LogedUser";

function NavBarComponent() {
  const { lang, setLang } = useContext(LanguageContext);
  //items in navbar options
  const items = [
    content[lang].home,
    content[lang].howitworks,
    content[lang].about,
  ];

  //language options
  const languages = ["English", "العربية"];
  //get route key depending on nav item
  const getKeyByValue = (object, value) => {
    return Object.keys(object).find((key) => object[key] === value);
  };

  //handle app language
  const handleAppLang = (event) => {
    let language = event.currentTarget.innerHTML;
    setLang(language === "English" ? "en" : "ar");
  };
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      style={{ backgroundColor: colors.bg.primary }}
      variant="light"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <Container>
        <Navbar.Brand href="/">
          <img
            src={Logo}
            className="img-fluid"
            alt="logo"
            style={{ width: 30 }}
          />
          <div className="fw-normal fs-6 mt-0">{content[lang].brand}</div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            {items.map((item, index) => (
              <Nav.Link key={index}>
                <Link
                  to={routes[getKeyByValue(content[lang], item)]}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {item}
                </Link>
              </Nav.Link>
            ))}
            <LogedUser />
            <NavDropdown
              title={content[lang].language}
              id="collasible-nav-dropdown"
            >
              {languages.map((l, index) => (
                <NavDropdown.Item key={index} onClick={handleAppLang}>
                  {l}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarComponent;
