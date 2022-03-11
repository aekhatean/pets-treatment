import React, { useEffect, useState, useContext } from "react";
import { Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { axiosAuthInstance, axiosInstance } from "../api";
import { colors } from "../colors/colors";
import { LanguageContext } from "../context/LanguageContext";
import { LogingContext } from "../context/LogingContext";
import { routes } from "../routes/routes";
import { content } from "../translation/translation";

function LogedUser(props) {
  const { lang } = useContext(LanguageContext);
  const { is_loged, setLogging, userRole, setUserRole } =
    useContext(LogingContext);
  const [user, setUser] = useState({ picture: "", full_name: "" });
  // const [is_loged, setLog] = useState(false);
  const loged_routes = [content[lang].dashboard];
  const unloged_routes = [
    content[lang].login,
    content[lang].doctor_register,
    content[lang].petowner_register,
  ];
  useEffect(() => {
    axiosAuthInstance
      .get("users/profilelist")
      .then((res) => {
        setUser({
          picture: res.data.data.picture,
          full_name: `${res.data.data.user.first_name} ${res.data.data.user.last_name}`,
        });
        setUserRole(res.data.data.role);
      })
      .catch((err) => {
        console.log(err);
        setUser({});
        setUserRole("");
      });
  }, [is_loged]);

  const getKeyByValue = (object, value) => {
    return Object.keys(object).find((key) => object[key] === value);
  };

  const logoutHandle = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setUser({});
    setLogging(false);
  };
  // console.log(user);
  if (is_loged && user !== {}) {
    return (
      <>
        <NavDropdown
          className="shadow px-3 "
          style={{
            borderRadius: 50,
            backgroundColor: colors.bg.blond,
          }}
          title={
            <>
              <img
                className="shadow-sm"
                src={`http://localhost:8000${user.picture}`}
                alt="profile_pircture"
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                }}
              />
              <Navbar.Text className="m-2" style={{ color: colors.text.dark }}>
                {user.full_name}
              </Navbar.Text>
            </>
          }
          id="collasible-nav-dropdown"
        >
          {loged_routes.map((route, index) => (
            <NavDropdown.Item key={index}>
              {
                <Link
                  to={routes[getKeyByValue(content[lang], route)]}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {route}
                </Link>
              }
            </NavDropdown.Item>
          ))}
          <NavDropdown.Item onClick={logoutHandle}>
            {content[lang].logout}
          </NavDropdown.Item>
        </NavDropdown>
      </>
    );
  }
  return (
    <>
      <NavDropdown
        className="shadow-sm"
        style={{
          borderRadius: 15,
          backgroundColor: colors.bg.blond,
          color: colors.text.dark,
        }}
        title={content[lang].guest}
        id="collasible-nav-dropdown"
      >
        {unloged_routes.map((route, index) => (
          <NavDropdown.Item key={index}>
            {
              <Link
                to={routes[getKeyByValue(content[lang], route)]}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {route}
              </Link>
            }
          </NavDropdown.Item>
        ))}
      </NavDropdown>
    </>
  );
}

export default LogedUser;
