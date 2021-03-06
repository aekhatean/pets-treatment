import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
//import reducer from './reducers';
//import createStore from redux
//import { createStore } from 'redux';
//import Provider from react-redux
//import { Provider } from 'react-redux';
//import redux devtools
//import { composeWithDevTools } from 'redux-devtools-extension';
import { LanguageContextProvider } from "./context/LanguageContext";
import { LogingContextProvider } from "./context/LogingContext";

//import middleware from './middlewares';
//createStore
//const store = createStore(reducer, composeWithDevTools(middleware));

ReactDOM.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <LanguageContextProvider>
      <LogingContextProvider>
        <App />
      </LogingContextProvider>
    </LanguageContextProvider>
    {/* </Provider> */}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
