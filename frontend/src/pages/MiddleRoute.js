import React, { useState, useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { LogingContext } from "../context/LogingContext";
import DoctorDashboard from "./DoctorDashboard";
import Home from "./Home";
import Login from "./Login";
import UserDashboard from "./UserDashboard";
function MiddleRoute() {
  const { is_loged, userRole } = useContext(LogingContext);
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          {is_loged ? (
            userRole === "DR" ? (
              <Route exact path="/dashboard" component={DoctorDashboard} />
            ) : (
              <Route exact path="/dashboard" component={UserDashboard} />
            )
          ) : (
            <Redirect to="login" />
          )}
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default MiddleRoute;
