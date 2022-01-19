import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ClinicProfile from "./pages/ClinicProfile";
import ClinicDashboard from "./pages/ClinicDashbord";
import UserDashboard from "./pages/UserDashboard";
import Navbar from "./components/Navbar";
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
          <Route path="/user/:id" component={UserDashboard} />
          <Route path="/dashboard/:id" component={ClinicDashboard} />
          <Route path="/clinic/:id" component={ClinicProfile} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
