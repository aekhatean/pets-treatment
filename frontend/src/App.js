import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DoctorPublicProfile from "./pages/DoctorPublicProfile";
import DoctorDashboard from "./pages/DoctorDashboard";
import UserDashboard from "./pages/UserDashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/search" component={SearchPage} />
          <Route path="/howitworks" component={HowItWorks} />
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/doctor_dashboard" component={DoctorDashboard} />
          <Route path="/user/:id" component={UserDashboard} />
          <Route path="/doctors/:id" component={DoctorPublicProfile} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
