import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import "../../assets/styles/Notification.css";
import "../../assets/styles/noti.css";
import profile from "../../assets/images/profile.png";

import { Link } from "react-router-dom";
import { getNotificationListById } from "../../services/webappMicroservice";
import { useSelector } from "react-redux";

function Notification() {
  const { sideBar, user } = useSelector((state) => state);
  const { isOpenNoti } = sideBar;
  const [notifications, setNotifications] = useState([]);
  
  useEffect(() => {
    getNotificationListById(user?.loggedInUser?._id).then((response) =>
      setNotifications(response)
    );
  }, []);
  // console.log("notifications", notifications);
  console.log(notifications, "<<<<notifications");
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

 
  return (
    <div style={{ display: isOpenNoti ? "block" : "none" }}>
      {/*  ------------ */}
      <div className="noti-full-box">
        <div className="empty-div-noti"></div>
        <div className="noti-outer">
          <div className="noti-container">
            <div className="notification-text">Notification</div>
            <div className="all-noti">
              <div className="single-noti">
                <div className="single-noti-inner ">
                  <img
                    src={profile}
                    width="24px"
                    height="24px"
                    className="noti-image"
                  />
                  <div className="noti-text">
                    <span className="heightlight">Eva 44</span> Textdfdf
                  </div>
                </div>

                <div className="time">11.03</div>
              </div>
              <div className="single-noti">
                <div className="single-noti-inner ">
                  <img
                    src={profile}
                    width="24px"
                    height="24px"
                    className="noti-image"
                  />
                  <div className="noti-text">
                    <span className="heightlight">Eva 44</span> Textdfdf
                  </div>
                </div>

                <div className="time">11.03</div>
              </div>
              <div className="single-noti">
                <div className="single-noti-inner ">
                  <img
                    src={profile}
                    width="24px"
                    height="24px"
                    className="noti-image"
                  />
                  <div className="noti-text">
                    <span className="heightlight">Eva 44</span> Textdfdf
                  </div>
                </div>

                <div className="time">11.03</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------ */}

    
    </div>
  );
}
export default Notification;
