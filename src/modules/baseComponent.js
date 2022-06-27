//base class
import React, {Component} from "react";

export default class BaseComponent extends Component {

    constructor(props) {
        if (
            !window.location.host.startsWith("www") &&
            !window.location.host.startsWith("localhost")
          ) {
            console.log(window.location.host,"Host NAme");
            window.location =
              window.location.protocol +
              "//" +
              "www." +
              window.location.host +
              window.location.pathname;
              console.log(window.location.host,"Host NAme");
          }
        super(props);
    }
}