import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {App,MarketingApp} from "./routes";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { store } from "./reducers/store";
import { Provider } from "react-redux";
let parseData = window.location.host.split(".");


if((parseData?.length===3 && parseData[0]==="www") || (parseData?.length<=2)) {

  //if subdomain have 


  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <MarketingApp />
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );
}
else{
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );
  

}
