import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { content } from "../translation/translation";
import { LanguageContext } from "../context/LanguageContext";
import { Link } from "react-router-dom";
import { routes } from "../routes/routes";
import Logo from "../assets/Logo.png";

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElLang, setAnchorElLang] = useState(null);
  const { lang, setLang } = useContext(LanguageContext);

  //items in navbar options
  const items = [
    content[lang].home,
    content[lang].howitworks,
    content[lang].about,
    content[lang].register,
    content[lang].login,
  ];
  //language options
  const languages = ["English", "العربية"];
  const colors = { bgPrimary: "#B8D8D6", textPrimary: "#010101" };

  //hangling app language
  const handleAppLang = (event) => {
    let language = event.currentTarget.innerHTML;
    console.log(language);
    setLang(language === "English" ? "en" : "ar");
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenLanguageMenu = (event) => {
    setAnchorElLang(event.currentTarget);
  };
  const handleCloseLanguageMenu = () => {
    setAnchorElLang(null);
    setAnchorElNav(null);
  };
  //get route key depending on nav item
  const getKeyByValue = (object, value) => {
    return Object.keys(object).find((key) => object[key] === value);
  };
  return (
    <>
      <AppBar
        position="static"
        sx={{
          bgcolor: colors.bgPrimary,
          boxShadow: "none",
          color: colors.textPrimary,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" }, flexGrow: 1 }}
            >
              <div className="my-auto">
                <img
                  src={Logo}
                  className="img-fluid"
                  alt="logo"
                  style={{ width: 30 }}
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    flexGrow: 1,
                  }}
                />

                <h6>{content[lang].brand}</h6>
              </div>
            </Typography>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              <div className="my-auto">
                <img
                  src={Logo}
                  className="img-fluid"
                  alt="logo"
                  style={{ width: 30 }}
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    flexGrow: 1,
                  }}
                />

                <h6>{content[lang].brand}</h6>
              </div>
            </Typography>
            <Box
              sx={{
                flexGrow: 0,
                display: { xs: "flex", md: "none" },
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {items.map((item) => (
                  <MenuItem key={item} onClick={handleCloseNavMenu}>
                    <Link
                      to={routes[getKeyByValue(content[lang], item)]}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        flexGrow: 1,
                      }}
                    >
                      <Typography textAlign="center">{item}</Typography>
                    </Link>
                  </MenuItem>
                ))}
                <MenuItem onClick={handleOpenLanguageMenu}>
                  <Typography textAlign="center">
                    {content[lang].language}
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
              {items.map((item) => (
                <Button
                  key={item}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 1, mx: 1, color: "inherit", display: "block" }}
                >
                  <Link
                    to={routes[getKeyByValue(content[lang], item)]}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {item}
                  </Link>
                </Button>
              ))}
              <Button
                onClick={handleOpenLanguageMenu}
                size="small"
                sx={{ p: 0, color: "inherit", my: 2 }}
              >
                {content[lang].language}
              </Button>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElLang}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElLang)}
                onClose={handleCloseLanguageMenu}
              >
                {languages.map((l) => (
                  <MenuItem key={l} onClick={handleCloseLanguageMenu}>
                    <Typography textAlign="center" onClick={handleAppLang}>
                      {l}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="xl" sx={{ p: 0 }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="100 160 1140 100">
          <path
            fill={colors.bgPrimary}
            fillOpacity="1"
            d="M0,32L80,64C160,96,320,160,480,192C640,224,800,224,960,186.7C1120,149,1280,75,1360,37.3L1440,0L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          ></path>
        </svg>
      </Container>
    </>
  );
}

export default Navbar;
