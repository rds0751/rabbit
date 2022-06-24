//base class
import React, {Component} from "react";

export default class BaseComponent extends Component {
    constructor(props) {
        if (
            !window.location.host.startsWith("www") &&
            !window.location.host.startsWith("localhost")
          ) {
            window.location =
              window.location.protocol +
              "//" +
              "www." +
              window.location.host +
              window.location.pathname;
          }
        super(props);
    }
}