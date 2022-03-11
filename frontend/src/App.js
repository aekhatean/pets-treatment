import React, { useState, useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DoctorPublicProfile from "./pages/DoctorPublicProfile";
import DoctorDashboard from "./pages/DoctorDashboard";
import UserDashboard from "./pages/UserDashboard";

import Footer from "./components/Footer";
import "react-chatbot-kit/build/main.css";
import Bot from "./chatbot/bot";
import { ConditionallyRender } from "react-util-kit";
import { ReactComponent as ButtonIcon } from "./assets/robot.svg";
import Doctors from "./pages/Doctors";
import NotFoundPage from "./pages/NotFoundPage";
import NavBarComponent from "./components/NavBarComponent";
import DoctorRegister from "./pages/DoctorRegister";
import PetOwnerRegister from "./pages/PetOwnerRegister";
import { LogingContext } from "./context/LogingContext";

function App() {
  const [showChatbot, toggleChatbot] = useState(false);
  const { is_loged } = useContext(LogingContext);
  return (
    <div className="App">
      <BrowserRouter>
        <NavBarComponent />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/search" component={SearchPage} />
          <Route path="/howitworks" component={HowItWorks} />
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
          <Route path="/doctor_register" component={DoctorRegister} />
          <Route path="/petowner_register" component={PetOwnerRegister} />
          <Route path="/user" component={UserDashboard} />
          <Route path="/doctors/:id" component={DoctorPublicProfile} />
          <Route path="/doctors/" component={Doctors} />
          <Route path="/error404" component={NotFoundPage} />
          {is_loged && <Route path="/dashboard" component={DoctorDashboard} />}
          <Redirect to="error404" />
        </Switch>
        <div className="app-chatbot-container">
          <ConditionallyRender ifTrue={showChatbot} show={<Bot />} />
        </div>
        <button
          className="app-chatbot-button"
          onClick={() => toggleChatbot((prev) => !prev)}
        >
          <ButtonIcon className="app-chatbot-button-icon" />
        </button>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
